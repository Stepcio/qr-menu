import OrdersList from "@/components/restaurants/orders/OrdersList"
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
      url: params.restaurantUrl
    },
    include: {
      menus: {
        where: {
          active: true
        }
      }
    }
  });

  if (!restaurant) {
    notFound();
  }
  
  const menuItems = await prisma.menuItem.findMany({
    where: {
      menuId: restaurant.menus[0]?.id
    }
  });

  return (
    <>
      <section className='mt-8'>
          <h1>Zamówienia</h1>
          {menuItems ? (
            <OrdersList menuItems={menuItems}/>
          ) : (
            <div>Brak zamówień.</div>
          )}
      </section>
    </>
  )
}
