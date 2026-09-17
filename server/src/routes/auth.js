import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../config/prisma.js';
import { signToken, getAuthCookieOptions } from '../utils/jwt.js';
import { authenticateToken, ROLES } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/security.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(4),
});

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input format.',
        errors: parse.error.format(),
      });
    }

    const { username, password } = parse.data;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase().trim() },
          { email: username.toLowerCase().trim() },
        ],
      },
    });

    if (!user || !user.isActive) {
      await logAudit(req, {
        action: 'FAILED_LOGIN',
        entity: 'Auth',
        details: `Failed login attempt for username: ${username}`,
        status: 'FAILURE',
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      await logAudit(req, {
        userId: user.id,
        action: 'FAILED_LOGIN',
        entity: 'Auth',
        details: 'Incorrect password entered',
        status: 'FAILURE',
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    const token = signToken(user);
    res.cookie('pmshri_token', token, getAuthCookieOptions());

    await logAudit(req, {
      userId: user.id,
      action: 'LOGIN',
      entity: 'Auth',
      details: `User logged in with role: ${user.role}`,
      status: 'SUCCESS',
    });

    res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token, // Also return in body for mobile/cross-origin clients
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  if (req.cookies?.pmshri_token) {
    logAudit(req, {
      action: 'LOGOUT',
      entity: 'Auth',
      status: 'SUCCESS',
    });
  }
  res.clearCookie('pmshri_token', { path: '/' });
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
