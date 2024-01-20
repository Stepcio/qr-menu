import prisma from '@/lib/prisma';

export default async function Page() {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <>
      <div className='flex flex-col gap-4'>
        {restaurants.map((restaurant, index) => 
          <div key={index}>{restaurant.name}</div>
        )}
      </div>
    </>
  )
}
