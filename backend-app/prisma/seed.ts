import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: 'admin', description: 'Administrador do sistema' },
        { name: 'user', description: 'Usuário comum' },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    console.log('Roles criadas com sucesso!');

    const adminRole = await prisma.role.findUnique({
        where: { name: 'admin' },
    });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            name: 'Administrador',
            email: 'admin@admin.com',
            password: hashedPassword,
            roles: {
                create: [
                    {
                        role: {
                            connect: { id: adminRole!.id },
                        },
                    },
                ],
            },
        },
    });

    console.log('Usuário admin criado com sucesso!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
