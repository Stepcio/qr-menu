import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
      url: params.restaurantUrl,
    },
    include: {
      menus: {
        where: {
          active: true
        },
      }
    }
  });

  if (!restaurant) {
    notFound();
  }

  return (
    <>
      <section>
        <h1>{ restaurant.name }</h1>

        {restaurant.menus.length > 0 && (
          <Link href={`/restaurants/${restaurant.url}/menu`}>
            <button>Menu</button>
          </Link>
        )}
      </section>
    </>
  )
}