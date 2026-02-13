
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const activities = [
        { category: 'Transport', type: 'Car', value: 15, carbonEmission: 1.8 },
        { category: 'Food', type: 'Veg', value: 1, carbonEmission: 1.5 },
        { category: 'Electricity', type: 'Default', value: 10, carbonEmission: 8.2 },
        { category: 'Shopping', type: 'Clothes', value: 2, carbonEmission: 4.0 },
        { category: 'Transport', type: 'Bike', value: 5, carbonEmission: 0.25 },
    ];

    for (const activity of activities) {
        await prisma.activity.create({
            data: activity,
        });
    }
    console.log('Dummy data seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
