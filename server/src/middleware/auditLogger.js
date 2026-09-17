import prisma from '../config/prisma.js';

export async function logAudit(req, { action, entity, entityId, details, status = 'SUCCESS' }) {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userId = req.user?.id || null;

    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId: entityId ? String(entityId) : null,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
        ipAddress: String(ipAddress),
        status,
      },
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
