import express from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';

const router = express.Router();

// GET /api/audit-logs - Protected audit log inspection
router.get('/', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const logs = await prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { username: true, fullName: true, role: true },
        },
      },
    });

    res.json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    next(err);
  }
});

export default router;
