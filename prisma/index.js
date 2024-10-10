// prisma/index.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  // Initialize Prisma Client

module.exports = prisma;  // Export the initialized Prisma client
