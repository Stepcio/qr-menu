import prisma from '@/lib/prisma';
import RestaurantCard from '@/components/restaurants/RestaurantCard';

export default async function Page() {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <>
      <div className='flex gap-4 mx-auto w-1/2'>
        {restaurants.map(restaurant => 
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        )}
      </div>
    </>
  )
}
