import MenuItem from "@/components/restaurants/items/MenuItem";
import type { MenuItem as MenuItemType } from "@prisma/client";

type Params = {
  name: string,
  items: MenuItemType[]
}

export default function ItemTypeSection({ name, items }: Params) {
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h2 className='text-2xl font-bold'>{ name }</h2>
        <div></div>
      </div>
      <div className='flex flex-col gap-3 mt-2'>
        {items.map(item => (
          <MenuItem key={item.id} item={item}/>
        ))}
      </div>
    </div>
  );
}