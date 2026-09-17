import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${uuidv4()}${ext}`;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are permitted.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

// POST /api/media/upload - Protected media upload
router.post(
  '/upload',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER, ROLES.TEACHER, ROLES.CONTENT_EDITOR),
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file provided or file type rejected.' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      const media = await prisma.mediaFile.create({
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          url: fileUrl,
          uploadedBy: req.user.username,
        },
      });

      await logAudit(req, {
        userId: req.user.id,
        action: 'UPLOAD',
        entity: 'MediaFile',
        entityId: media.id,
        details: `Uploaded file: ${media.originalName} (${(media.size / 1024).toFixed(1)} KB)`,
      });

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully.',
        data: {
          id: media.id,
          url: fileUrl,
          filename: media.filename,
          size: media.size,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/media/files - Protected list
router.get('/files', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const files = await prisma.mediaFile.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, count: files.length, data: files });
  } catch (err) {
    next(err);
  }
});

export default router;
