import MenuItem from '@/components/menu/menu-item'
import menu from '@/db/menu.json'

export default function Page() {
  return (
    <>
      
      <div className='flex flex-col gap-4'>
        {menu.map((item, index) => 
          <MenuItem key={index} title={item.name} ingredients={item.ingredients} image={item.image} />
        )}
      </div>
    </>
  )
}
