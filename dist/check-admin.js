"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const admin = await prisma.user.findUnique({
        where: { email: 'admin' },
    });
    if (admin) {
        console.log('Admin user found:', admin.email, admin.role);
    }
    else {
        console.error('Admin user NOT found');
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check-admin.js.map