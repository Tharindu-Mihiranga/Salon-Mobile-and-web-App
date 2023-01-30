const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');

const main = async () => {
    const superAdmin = await prisma.user.upsert({
        where: {
            email: 'suAdmin@cleancut.com',
          },
          update: {
            name: 'SuAdmin',
            phone: '000000000',
            role: 10,
            password: await bcrypt.hashSync('suAdmin@123', 10),
          },
          create: {
            email: 'suAdmin@cleancut.com',
            name: 'SuAdmin',
            phone: '000000000',
            role: 10,
            password: await bcrypt.hashSync('suAdmin@123', 10),
          },
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
