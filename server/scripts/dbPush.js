import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
  console.log('ℹ DATABASE_URL not found in environment; setting default to file:./dev.db');
}

try {
  console.log(`Running Prisma DB Push with DATABASE_URL: ${process.env.DATABASE_URL}`);
  const prismaBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execSync(`${prismaBin} prisma db push`, { stdio: 'inherit', env: process.env });
} catch (e) {
  console.error('Prisma DB Push failed:', e.message);
  process.exit(1);
}
