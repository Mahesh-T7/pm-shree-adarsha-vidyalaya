import express from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

// GET /api/settings - Get all settings
router.get('/', async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map = {};
    for (const s of settings) {
      try {
        map[s.id] = JSON.parse(s.value);
      } catch (e) {
        map[s.id] = s.value;
      }
    }
    res.json({ success: true, data: map });
  } catch (err) {
    next(err);
  }
});

// GET /api/settings/:key
router.get('/:key', async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { id: req.params.key },
    });
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }
    res.json({
      success: true,
      key: setting.id,
      data: JSON.parse(setting.value),
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/settings/:key - Protected update
router.put('/:key', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const { key } = req.params;
    const valueStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const setting = await prisma.siteSetting.upsert({
      where: { id: key },
      update: {
        value: valueStr,
        updatedBy: req.user.username,
      },
      create: {
        id: key,
        value: valueStr,
        updatedBy: req.user.username,
      },
    });

    await logAudit(req, {
      userId: req.user.id,
      action: 'UPDATE',
      entity: 'SiteSetting',
      entityId: key,
      details: `Updated site section settings: ${key}`,
    });

    res.json({
      success: true,
      message: `Settings for ${key} updated successfully.`,
      data: JSON.parse(setting.value),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
