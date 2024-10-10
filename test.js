const prisma = require('./prisma/index');

async function testPrisma() {
    try {
        const users = await prisma.user.findMany();
        console.log('Users:', users);
    } catch (error) {
        console.error('Prisma test error:', error);
    }
}

testPrisma();
