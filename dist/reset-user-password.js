"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'belalhassan1985@gmail.com';
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Resetting password for ${email}...`);
    await prisma.user.update({
        where: { email },
        data: {
            password: hashedPassword,
        },
    });
    console.log('Password updated to: 123456');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=reset-user-password.js.map