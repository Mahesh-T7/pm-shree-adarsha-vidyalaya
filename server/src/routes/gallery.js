import express from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { sanitizeText } from '../utils/sanitize.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

// GET /api/gallery
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category && category !== 'All') {
      where.category = category;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
});

// POST /api/gallery
router.post('/', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const { title, category, tag, img, description } = req.body;
    if (!title || !img) {
      return res.status(400).json({ success: false, message: 'Title and image are required.' });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: sanitizeText(title),
        category: category || 'Campus',
        tag: sanitizeText(tag || 'School Event'),
        img,
        description: description ? sanitizeText(description) : '',
      },
    });

    await logAudit(req, {
      userId: req.user.id,
      action: 'CREATE',
      entity: 'GalleryItem',
      entityId: item.id,
      details: `Added gallery photo: ${item.title}`,
    });

    res.status(201).json({ success: true, message: 'Gallery item added.', data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.galleryItem.delete({ where: { id } });
    await logAudit(req, {
      userId: req.user.id,
      action: 'DELETE',
      entity: 'GalleryItem',
      entityId: id,
    });
    res.json({ success: true, message: 'Gallery item deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
