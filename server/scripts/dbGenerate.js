import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

try {
  console.log('Generating Prisma Client...');
  const prismaBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execSync(`${prismaBin} prisma generate`, { stdio: 'inherit', env: process.env });
} catch (e) {
  console.error('Prisma Generate failed:', e.message);
  process.exit(1);
}
