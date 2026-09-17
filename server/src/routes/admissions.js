import express from 'express';
import { z } from 'zod';
import prisma from '../config/prisma.js';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth.js';
import { sanitizeText } from '../utils/sanitize.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

const admissionSchema = z.object({
  studentName: z.string().min(2).max(100),
  dob: z.string().min(4),
  parentName: z.string().min(2).max(100),
  phone: z.string().min(8).max(15),
  state: z.string().default('Karnataka'),
  board: z.string().default('CBSE'),
});

const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(8).max(15),
  grade: z.string().min(2),
  message: z.string().optional(),
});

// POST /api/admissions - Public submission
router.post('/admissions', async (req, res, next) => {
  try {
    const parse = admissionSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: 'Invalid input', errors: parse.error.format() });
    }

    const item = await prisma.admission.create({
      data: {
        studentName: sanitizeText(parse.data.studentName),
        dob: parse.data.dob,
        parentName: sanitizeText(parse.data.parentName),
        phone: sanitizeText(parse.data.phone),
        state: sanitizeText(parse.data.state),
        board: sanitizeText(parse.data.board),
        status: 'PENDING',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Admission registration received successfully. Our team will contact you.',
      id: item.id,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admissions - Protected
router.get('/admissions', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const list = await prisma.admission.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
});

// POST /api/enquiries - Public enquiry
router.post('/enquiries', async (req, res, next) => {
  try {
    const parse = enquirySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: 'Invalid input', errors: parse.error.format() });
    }

    const item = await prisma.enquiry.create({
      data: {
        name: sanitizeText(parse.data.name),
        email: sanitizeText(parse.data.email),
        phone: sanitizeText(parse.data.phone),
        grade: sanitizeText(parse.data.grade),
        message: parse.data.message ? sanitizeText(parse.data.message) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will get back to you shortly.',
      id: item.id,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/enquiries - Protected
router.get('/enquiries', authenticateToken, requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER), async (req, res, next) => {
  try {
    const list = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
});

export default router;
