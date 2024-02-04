'use client';
import { IoAdd } from "react-icons/io5";

type Params = {
  itemId: number
}

declare global {
    interface Window { Order: number[]; }
}

export default function AddToOrderButton({ itemId }: Params) {
  const addItemToOrder = () => {
    window.Order = window.Order || [];

    if(window.Order.length > 2) return;

    window.Order.push(itemId)
    window.dispatchEvent(new CustomEvent('order-change'));
  };

  return (
    <button onClick={addItemToOrder}>
      <IoAdd className='h-[30px] w-[30px]' />
    </button>
  );
}