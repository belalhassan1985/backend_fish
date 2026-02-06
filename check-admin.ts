
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.findUnique({
        where: { email: 'admin' },
    })
    if (admin) {
        console.log('Admin user found:', admin.email, admin.role)
    } else {
        console.error('Admin user NOT found')
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
