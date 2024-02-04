import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ItemTypeSection from '@/components/restaurants/items/ItemTypeSection';
import OrderPopup from '@/components/restaurants/orders/OrderPopup';

export const dynamicParams = true;

export async function generateStaticParams() {
  const restaurants = await prisma.restaurant.findMany();
 
  return restaurants.map((restaurant) => ({
    restaurantUrl: restaurant.url,
  }));
}

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
      menus: true
    }
  });
  
  if (!restaurant) {
    notFound();
  }
  
  const itemTypes = await prisma.itemType.findMany({
    include: {
      menuItems: {
        where: {
          menuId: restaurant.menus[0]?.id
        }
      }
    },
    where: {
      menuItems: {
        some: {
          menuId: restaurant.menus[0]?.id
        }
      }
    }
  });

  return (
    <>
      <section>
          <div className='relative w-full h-[220px] md:h-[260px]'>
            <Image src={restaurant.backgroundImage} className='object-cover brightness-[0.6]' alt={`${restaurant.name} background image`} fill priority/>
            <h1 className='absolute bottom-0 left-0 ml-4 mb-4 text-3xl font-bold'>{ restaurant.name }</h1>
          </div>
      </section>
      <section className='mx-4 mt-4 mb-24'>
        <div className='flex flex-col gap-4'>
          {itemTypes.map((type) => (
            <ItemTypeSection key={type.id} name={type.name} items={type.menuItems} />
          ))}
        </div>
      </section>
      <section>
        <OrderPopup />
      </section>
    </>
  )
}