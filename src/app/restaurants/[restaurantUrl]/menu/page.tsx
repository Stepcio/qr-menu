import MenuItem from '@/components/menu/menu-item'
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    restaurantUrl: string
  }
}

export default async function Page({ params }: Params) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      url: params.restaurantUrl,
    },
    include: {
      menus: {
        where: {
          active: true
        },
        include: {
          menuItems: true
        }
      }
    }
  });

  if (!restaurant || restaurant.menus.length === 0) {
    notFound();
  }

  const menuItems = restaurant.menus[0].menuItems;

  return (
    <>
      <div className='flex flex-col gap-4'>
        {menuItems.map((item, index) => 
          <MenuItem key={index} title={item.name} ingredients={item.ingredients} photo={item.photo} />
        )}
      </div>
    </>
  )
}