import Image from "next/image";
import type { MenuItem } from "@prisma/client";
import AddToOrderButton from "../orders/AddToOrderButton";

type Params = {
  item: MenuItem
}

export default function MenuItem({ item }: Params) {
  const {name, ingredients, photo} = item;

  return (
    <div className='rounded-3xl h-[80px] p-[1px] w-full mx-auto'>
      <div className='flex h-full w-full bg-dim rounded-3xl'>
        <div className='relative h-full aspect-square'>
          { photo ? (
            <Image src={photo} alt='menu-item' fill={true} className='rounded-3xl'/>
          ) : (
            <div></div>
          )}
        </div>
        <div className='w-[55%] p-2 mx-[5%] font-bold rounded-3xl'>
          {name}
          <div className='font-light overflow-hidden text-ellipsis whitespace-nowrap'>
            {ingredients ? (
              ingredients.join(', ')
            ) : null}
          </div>
        </div>
        <div className='w-[10%] ml-auto my-auto mr-2'>
          <AddToOrderButton itemId={item.id}/>
        </div>
      </div>
    </div>
  );
}