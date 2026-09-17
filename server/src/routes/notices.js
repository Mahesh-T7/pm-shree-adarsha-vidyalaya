import express from 'express';
import { z } from 'zod';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { sanitizeText } from '../utils/sanitize.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

const noticeSchema = z.object({
  type: z.enum(['order', 'event', 'news', 'photo', 'video']).default('news'),
  title: z.string().min(3).max(250),
  content: z.string().min(5),
  date: z.string().optional(),
  tag: z.string().optional(),
  author: z.string().default('ಮುಖ್ಯಗುರುಗಳು (Head Master)'),
  mediaUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  isPinned: z.boolean().default(false),
});

// GET /api/notices - Public list
router.get('/', async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = { status: 'PUBLISHED' };

    if (type && type !== 'all') {
      where.type = type;
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({ success: true, count: notices.length, data: notices });
  } catch (err) {
    next(err);
  }
});

// POST /api/notices - Protected create
router.post(
  '/',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER),
  async (req, res, next) => {
    try {
      const parse = noticeSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: parse.error.format() });
      }

      const data = parse.data;
      const typeTags = {
        order: 'ಅಧಿಕೃತ ಆದೇಶ',
        event: 'ಇಂದಿನ ಕಾರ್ಯಕ್ರಮ',
        news: 'ದೈನಂದಿನ ವಾರ್ತೆ',
        photo: 'ಕಾರ್ಯಕ್ರಮದ ಫೋಟೋ',
        video: 'ಶಾಲಾ ವೀಡಿಯೊ',
      };

      const notice = await prisma.notice.create({
        data: {
          type: data.type,
          title: sanitizeText(data.title),
          content: data.content.trim(),
          date: data.date || new Date().toISOString().split('T')[0],
          tag: sanitizeText(data.tag || typeTags[data.type] || 'ಪ್ರಕಟಣೆ'),
          author: sanitizeText(data.author),
          mediaUrl: data.mediaUrl || null,
          videoUrl: data.videoUrl || null,
          isPinned: !!data.isPinned,
          status: 'PUBLISHED',
        },
      });

      await logAudit(req, {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'Notice',
        entityId: notice.id,
        details: `Created notice: ${notice.title}`,
      });

      res.status(201).json({ success: true, message: 'Notice published successfully.', data: notice });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/notices/:id - Protected delete
router.delete(
  '/:id',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });

      const notice = await prisma.notice.delete({ where: { id } });

      await logAudit(req, {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'Notice',
        entityId: id,
        details: `Deleted notice: ${notice.title}`,
      });

      res.json({ success: true, message: 'Notice deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
