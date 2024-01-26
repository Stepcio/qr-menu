import Image from "next/image";
import Link from "next/link";

type Params = {
  restaurant: {
    id: number,
    name: string,
    description: string,
    url: string,
    backgroundImage: string,
    locations: string[]
  }
}

export default function RestaurantCard({ restaurant }: Params) {
  return (
    <Link href={`/restaurants/${restaurant.url}`} className="flex flex-col w-1/4 rounded-lg border border-light overflow-hidden">
      <div className="relative bg-dim w-full aspect-[16/9] overflow-hidden">
          <Image src={restaurant.backgroundImage} alt={`${restaurant.name} background`} className="object-cover" fill></Image>
      </div>
      <div className="">
        {restaurant.name}
      </div> 
      <div>
        {restaurant.description}
      </div>
    </Link>
  );
}