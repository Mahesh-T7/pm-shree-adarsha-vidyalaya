import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/prisma.js';

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HEAD_MASTER: 'HEAD_MASTER',
  TEACHER: 'TEACHER',
  CONTENT_EDITOR: 'CONTENT_EDITOR',
  VIEWER: 'VIEWER',
};

export async function authenticateToken(req, res, next) {
  let token = req.cookies?.pmshri_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.clearCookie('pmshri_token');
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }

  // Ensure user still exists and is active in database
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, username: true, email: true, role: true, fullName: true, isActive: true },
  });

  if (!user || !user.isActive) {
    res.clearCookie('pmshri_token');
    return res.status(401).json({
      success: false,
      message: 'User account is disabled or does not exist.',
    });
  }

  req.user = user;
  next();
}

export function optionalAuth(req, res, next) {
  let token = req.cookies?.pmshri_token;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    // SUPER_ADMIN has full permissions
    if (req.user.role === ROLES.SUPER_ADMIN) {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions for this action.',
        requiredRoles: allowedRoles,
      });
    }

    next();
  };
}
