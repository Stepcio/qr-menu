const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Restauracja',
      addresses: [
        'Łabiszyńska 25'
      ],
    },
  });

  const menu = await prisma.menu.create({
    data: {
      restaurantId: restaurant.id,
    },
  });

  const itemType = await prisma.itemType.create({
    data: {
      name: "Burgery"
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Burger 2",
        ingredients: ['bułka', 'mięso'],
        menuId: menu.id,
        typeId: itemType.id
      },
      {
        name: "Burger 1",
        ingredients: ['bułka', 'mięso'],
        menuId: menu.id,
        typeId: itemType.id
      },
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
