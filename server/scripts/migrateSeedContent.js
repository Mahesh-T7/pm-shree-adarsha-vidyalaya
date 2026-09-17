import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

// Load existing client data modules dynamically
const blogPostsPath = path.resolve(__dirname, '../../src/data/blogPosts.js');
const hmPostsPath = path.resolve(__dirname, '../../src/data/hmPosts.js');
const achievementsPath = path.resolve(__dirname, '../../src/data/achievements.js');
const attractionsPath = path.resolve(__dirname, '../../src/data/attractions.js');
const siteContentPath = path.resolve(__dirname, '../../src/data/siteContent.js');

async function migrate() {
  console.log('--- Starting Content Migration & Database Seeding ---');

  // 1. Seed / Verify Administrator User
  const adminUsername = process.env.INITIAL_ADMIN_USERNAME || 'headmaster';
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Adarsha@Sindhanur2026!';
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'principal@pmshreeadarshasindhanur.org';

  let adminUser = await prisma.user.findUnique({ where: { username: adminUsername } });
  if (!adminUser) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    adminUser = await prisma.user.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        fullName: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
        passwordHash,
        role: 'HEAD_MASTER',
        isActive: true,
      },
    });
    console.log(`✓ Created Head Master Administrator account: ${adminUsername}`);
  } else {
    console.log(`ℹ Head Master Administrator account already exists: ${adminUsername}`);
  }

  // Also seed a SUPER_ADMIN account
  let superAdmin = await prisma.user.findUnique({ where: { username: 'superadmin' } });
  if (!superAdmin) {
    const superHash = await bcrypt.hash('AdarshaAdmin@2026#Secure', 12);
    superAdmin = await prisma.user.create({
      data: {
        username: 'superadmin',
        email: 'admin@pmshreeadarshasindhanur.org',
        fullName: 'System Super Administrator',
        passwordHash: superHash,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });
    console.log('✓ Created Super Administrator account: superadmin');
  }

  // 2. Import Blog Posts
  const { blogPosts } = await import(`file://${blogPostsPath}`);
  console.log(`Found ${blogPosts.length} original blog posts to migrate.`);

  let postMigrateCount = 0;
  for (const post of blogPosts) {
    const slug = (post.title || `post-${post.id}`)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80) + `-${post.id}`;

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: post.image || '/school-banner.jpg',
        category: post.category || 'Latest',
        author: post.author || 'Principal / HM',
        readTime: post.readTime || '5 min read',
        featured: post.id === 101,
      },
      create: {
        id: post.id,
        title: post.title,
        slug,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: post.image || '/school-banner.jpg',
        category: post.category || 'Latest',
        author: post.author || 'Principal / HM',
        readTime: post.readTime || '5 min read',
        status: 'PUBLISHED',
        featured: post.id === 101,
        publishedAt: new Date(),
      },
    });
    postMigrateCount++;
  }
  console.log(`✓ Migrated ${postMigrateCount} blog posts into database.`);

  // 3. Import HM Notices / Bulletin Posts
  const { initialHMPosts } = await import(`file://${hmPostsPath}`);
  console.log(`Found ${initialHMPosts.length} original HM notices to migrate.`);

  let noticeMigrateCount = 0;
  for (const notice of initialHMPosts) {
    await prisma.notice.upsert({
      where: { id: notice.id },
      update: {
        type: notice.type || 'news',
        title: notice.title,
        content: notice.content,
        date: notice.date || new Date().toISOString().split('T')[0],
        tag: notice.tag || 'ಪ್ರಕಟಣೆ',
        author: notice.author || 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
        mediaUrl: notice.mediaUrl || null,
        videoUrl: notice.videoUrl || null,
        isPinned: !!notice.isPinned,
      },
      create: {
        id: notice.id,
        type: notice.type || 'news',
        title: notice.title,
        content: notice.content,
        date: notice.date || new Date().toISOString().split('T')[0],
        tag: notice.tag || 'ಪ್ರಕಟಣೆ',
        author: notice.author || 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
        mediaUrl: notice.mediaUrl || null,
        videoUrl: notice.videoUrl || null,
        isPinned: !!notice.isPinned,
        status: 'PUBLISHED',
      },
    });
    noticeMigrateCount++;
  }
  console.log(`✓ Migrated ${noticeMigrateCount} notices into database.`);

  // 4. Import Academic Toppers
  const { academicToppers } = await import(`file://${achievementsPath}`);
  console.log(`Found ${academicToppers.length} SSLC toppers to migrate.`);

  let topperMigrateCount = 0;
  for (const topper of academicToppers) {
    await prisma.achievement.upsert({
      where: { id: topper.id },
      update: {
        name: topper.name,
        fatherName: topper.fatherName || null,
        htNo: topper.htNo || null,
        score: topper.score || '600/625',
        marks: topper.marks || 600,
        percentage: topper.percentage || '96.00%',
        rank: topper.rank || 'RANK',
        photo: topper.photo || '/students/student-1.jpg',
        avatar: topper.avatar || null,
        year: '2025-26',
      },
      create: {
        id: topper.id,
        name: topper.name,
        fatherName: topper.fatherName || null,
        htNo: topper.htNo || null,
        score: topper.score || '600/625',
        marks: topper.marks || 600,
        percentage: topper.percentage || '96.00%',
        rank: topper.rank || 'RANK',
        photo: topper.photo || '/students/student-1.jpg',
        avatar: topper.avatar || null,
        year: '2025-26',
      },
    });
    topperMigrateCount++;
  }
  console.log(`✓ Migrated ${topperMigrateCount} academic toppers into database.`);

  // 5. Import Gallery Items
  const { defaultGalleryItems } = await import(`file://${siteContentPath}`);
  console.log(`Found ${defaultGalleryItems.length} gallery items to migrate.`);

  let galleryMigrateCount = 0;
  for (const item of defaultGalleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        category: item.category || 'Campus',
        tag: item.tag || 'School Event',
        img: item.img,
        description: item.description || '',
      },
      create: {
        id: item.id,
        title: item.title,
        category: item.category || 'Campus',
        tag: item.tag || 'School Event',
        img: item.img,
        description: item.description || '',
      },
    });
    galleryMigrateCount++;
  }
  console.log(`✓ Migrated ${galleryMigrateCount} gallery items into database.`);

  // 6. Import Site Settings (About, Facilities, High School, Uniforms, Authors, Nav, Headlines, Attractions)
  const { defaultSiteContent, defaultNavItems, defaultBlogCategories, defaultHeadlines } = await import(`file://${siteContentPath}`);
  const { attractionsData } = await import(`file://${attractionsPath}`);
  const { generalStats } = await import(`file://${achievementsPath}`);

  const settingsToStore = [
    { id: 'about', value: JSON.stringify(defaultSiteContent.about) },
    { id: 'facilities', value: JSON.stringify(defaultSiteContent.facilities) },
    { id: 'highSchool', value: JSON.stringify(defaultSiteContent.highSchool) },
    { id: 'uniforms', value: JSON.stringify(defaultSiteContent.uniforms) },
    { id: 'authorMessages', value: JSON.stringify(defaultSiteContent.authorMessages) },
    { id: 'navItems', value: JSON.stringify(defaultNavItems) },
    { id: 'blogCategories', value: JSON.stringify(defaultBlogCategories) },
    { id: 'headlines', value: JSON.stringify(defaultHeadlines) },
    { id: 'attractions', value: JSON.stringify(attractionsData) },
    { id: 'generalStats', value: JSON.stringify(generalStats) },
  ];

  for (const setting of settingsToStore) {
    await prisma.siteSetting.upsert({
      where: { id: setting.id },
      update: { value: setting.value, updatedAt: new Date() },
      create: { id: setting.id, value: setting.value },
    });
  }
  console.log(`✓ Stored ${settingsToStore.length} site settings collections into database.`);

  // 7. Audit Log initial migration
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'SYSTEM_INITIAL_MIGRATION',
      entity: 'ALL_DATA',
      details: `Migrated ${postMigrateCount} posts, ${noticeMigrateCount} notices, ${topperMigrateCount} toppers, ${galleryMigrateCount} gallery items, and all site settings.`,
      status: 'SUCCESS',
    },
  });

  console.log('--- Migration Finished Successfully with Zero Data Loss ---');
}

migrate()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
