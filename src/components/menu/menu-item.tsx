import Image from "next/image";

type Params = {
  title: string,
  ingredients: string[],
  image: {
    src: string,
    alt: string
  }
}

export default function MenuItem({title, ingredients, image}: Params) {
  return (
    <div className='rounded-3xl h-[80px] p-[1px] w-fit mx-auto'>
      <div className='flex h-full w-full bg-dim rounded-3xl'>
        <div className='relative h-full aspect-square'>
          <Image src={image.src} alt={image.alt} fill={true} className='rounded-3xl'/>
        </div>
        <div className='p-2 mx-[5%] font-bold rounded-3xl'>
          {title}
          <div className='font-light rounded-3xl'>
            {ingredients.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}