// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
  // Optimize for NeonDB in serverless
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Persist in development to handle hot reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Optional: Log initialization errors
prisma.$connect().catch((error) => {
  console.error('Failed to initialize PrismaClient:', error);
});

export default prisma;