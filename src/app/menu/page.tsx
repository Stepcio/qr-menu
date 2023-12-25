import MenuItem from '@/components/menu/menu-item'
import prisma from '@/lib/prisma';

export default async function Page() {
  const menuItems = await prisma.menuItem.findMany();

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
