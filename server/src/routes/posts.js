import express from 'express';
import { z } from 'zod';
import prisma from '../config/prisma.js';
import { authenticateToken, optionalAuth, requireRole, ROLES } from '../middleware/auth.js';
import { sanitizeRichText, sanitizeText } from '../utils/sanitize.js';
import { logAudit } from '../middleware/auditLogger.js';

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(3).max(250),
  excerpt: z.string().min(5).max(1000),
  content: z.string().min(10),
  image: z.string().optional(),
  category: z.string().default('Latest'),
  author: z.string().default('Principal / HM'),
  readTime: z.string().default('5 min read'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  featured: z.boolean().default(false),
});

// GET /api/posts - Public list
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { category, search, author, status } = req.query;

    const where = {};

    // Only administrators can see DRAFT or ARCHIVED posts
    const canSeeDrafts = req.user && [ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER, ROLES.TEACHER, ROLES.CONTENT_EDITOR].includes(req.user.role);
    if (!canSeeDrafts || !status) {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }

    if (category && category !== 'Latest' && category !== 'All' && category !== 'Authors') {
      where.category = category;
    }

    if (author) {
      where.author = author;
    }

    if (search) {
      const q = String(search).toLowerCase();
      where.OR = [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { content: { contains: q } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
    });

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:slugOrId - Public single post
router.get('/:slugOrId', optionalAuth, async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    const numericId = parseInt(slugOrId, 10);

    const post = await prisma.blogPost.findFirst({
      where: isNaN(numericId) ? { slug: slugOrId } : { OR: [{ id: numericId }, { slug: slugOrId }] },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Check draft visibility
    if (post.status !== 'PUBLISHED') {
      const canSee = req.user && [ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER, ROLES.TEACHER].includes(req.user.role);
      if (!canSee) {
        return res.status(404).json({ success: false, message: 'Article not found or not published.' });
      }
    }

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// POST /api/posts - Protected create
router.post(
  '/',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER, ROLES.TEACHER, ROLES.CONTENT_EDITOR),
  async (req, res, next) => {
    try {
      const parse = postSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: parse.error.format() });
      }

      const data = parse.data;
      const slug = (data.title || `post-${Date.now()}`)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 80) + `-${Date.now()}`;

      const post = await prisma.blogPost.create({
        data: {
          title: sanitizeText(data.title),
          slug,
          excerpt: sanitizeText(data.excerpt),
          content: sanitizeRichText(data.content),
          image: data.image || '/school-banner.jpg',
          category: sanitizeText(data.category),
          author: sanitizeText(data.author),
          readTime: data.readTime || '4 min read',
          status: data.status,
          featured: !!data.featured,
        },
      });

      await logAudit(req, {
        userId: req.user.id,
        action: 'CREATE',
        entity: 'BlogPost',
        entityId: post.id,
        details: `Created article: ${post.title}`,
      });

      res.status(201).json({ success: true, message: 'Article created successfully.', data: post });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/posts/:id - Protected update
router.put(
  '/:id',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER, ROLES.TEACHER, ROLES.CONTENT_EDITOR),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });

      const existing = await prisma.blogPost.findUnique({ where: { id } });
      if (!existing) return res.status(404).json({ success: false, message: 'Article not found' });

      const { title, excerpt, content, image, category, author, readTime, status, featured } = req.body;

      const updated = await prisma.blogPost.update({
        where: { id },
        data: {
          ...(title && { title: sanitizeText(title) }),
          ...(excerpt && { excerpt: sanitizeText(excerpt) }),
          ...(content && { content: sanitizeRichText(content) }),
          ...(image && { image }),
          ...(category && { category: sanitizeText(category) }),
          ...(author && { author: sanitizeText(author) }),
          ...(readTime && { readTime }),
          ...(status && { status }),
          ...(typeof featured === 'boolean' && { featured }),
        },
      });

      await logAudit(req, {
        userId: req.user.id,
        action: 'UPDATE',
        entity: 'BlogPost',
        entityId: id,
        details: `Updated article: ${updated.title}`,
      });

      res.json({ success: true, message: 'Article updated successfully.', data: updated });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/posts/:id - Protected delete
router.delete(
  '/:id',
  authenticateToken,
  requireRole(ROLES.SUPER_ADMIN, ROLES.HEAD_MASTER),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' });

      const post = await prisma.blogPost.delete({ where: { id } });

      await logAudit(req, {
        userId: req.user.id,
        action: 'DELETE',
        entity: 'BlogPost',
        entityId: id,
        details: `Deleted article: ${post.title}`,
      });

      res.json({ success: true, message: 'Article deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
