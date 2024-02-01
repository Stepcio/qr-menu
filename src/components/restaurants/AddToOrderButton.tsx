'use client';

type Params = {
  itemId: number
}

declare global {
    interface Window { Order: number[]; }
}

export default function AddToOrderButton({ itemId }: Params) {
  const addItemToOrder = () => {
    window.Order = window.Order || [];
    window.Order.push(itemId)
    window.dispatchEvent(new CustomEvent('order-change'));
  };

  return (
    <button onClick={addItemToOrder}>
      Dodaj do zamówienia
    </button>
  );
}