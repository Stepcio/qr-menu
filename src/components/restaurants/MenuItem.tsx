import Image from "next/image";
import type { MenuItem } from "@prisma/client";
import AddToOrderButton from "./AddToOrderButton";

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
        <div className='p-2 mx-[5%] font-bold rounded-3xl'>
          {name}
          <div className='font-light rounded-3xl'>
            {ingredients ? (
              ingredients
            ) : null}
          </div>
        </div>
        <div>
          <AddToOrderButton itemId={item.id}/>
        </div>
      </div>
    </div>
  );
}