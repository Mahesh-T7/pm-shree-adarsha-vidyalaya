import express from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { sanitizeText } from '../utils/sanitize.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

// GET /api/achievements
router.get('/', async (req, res, next) => {
  try {
    const toppers = await prisma.achievement.findMany({
      orderBy: { marks: 'desc' },
    });
    res.json({ success: true, count: toppers.length, data: toppers });
  } catch (err) {
    next(err);
  }
});

// POST /api/achievements
router.post('/', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const { name, fatherName, htNo, score, marks, percentage, rank, photo, avatar, year } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    const topper = await prisma.achievement.create({
      data: {
        name: sanitizeText(name),
        fatherName: fatherName ? sanitizeText(fatherName) : null,
        htNo: htNo ? sanitizeText(htNo) : null,
        score: score || '600/625',
        marks: marks ? parseInt(marks, 10) : 600,
        percentage: percentage || '96.00%',
        rank: rank || 'RANK',
        photo: photo || '/students/student-1.jpg',
        avatar: avatar || null,
        year: year || '2025-26',
      },
    });

    await logAudit(req, {
      userId: req.user.id,
      action: 'CREATE',
      entity: 'Achievement',
      entityId: topper.id,
      details: `Added topper: ${topper.name}`,
    });

    res.status(201).json({ success: true, message: 'Topper added successfully.', data: topper });
  } catch (err) {
    next(err);
  }
});

// PUT /api/achievements/:id
router.put('/:id', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, fatherName, htNo, score, marks, percentage, rank, photo, avatar, year } = req.body;

    const updated = await prisma.achievement.update({
      where: { id },
      data: {
        ...(name && { name: sanitizeText(name) }),
        ...(fatherName !== undefined && { fatherName: fatherName ? sanitizeText(fatherName) : null }),
        ...(htNo !== undefined && { htNo: htNo ? sanitizeText(htNo) : null }),
        ...(score && { score }),
        ...(marks && { marks: parseInt(marks, 10) }),
        ...(percentage && { percentage }),
        ...(rank && { rank }),
        ...(photo && { photo }),
        ...(avatar !== undefined && { avatar }),
        ...(year && { year }),
      },
    });

    await logAudit(req, {
      userId: req.user.id,
      action: 'UPDATE',
      entity: 'Achievement',
      entityId: id,
      details: `Updated topper: ${updated.name}`,
    });

    res.json({ success: true, message: 'Topper updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/achievements/:id
router.delete('/:id', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.achievement.delete({ where: { id } });
    await logAudit(req, {
      userId: req.user.id,
      action: 'DELETE',
      entity: 'Achievement',
      entityId: id,
    });
    res.json({ success: true, message: 'Topper removed successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
