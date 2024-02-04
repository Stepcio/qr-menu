'use client';
import { useEffect, useState } from "react";
import { createOrder } from "@/lib/actions";
import styles from './styles.module.css';

declare global {
  interface Window { Order: number[]; }
}

export default function OrderPopup() {
  if (typeof window !== "undefined") {
    window.Order = window.Order || [];
  }

  const [order, setOrder] = useState<number[]>([]);

  const updateOrder = () => {
    setOrder([...window.Order]);
  }

  useEffect(() => {
    window.addEventListener('order-change', updateOrder);

    return () => {
      window.removeEventListener('order-change', updateOrder);
  };
  }, []);

  return (
    <>
      <div className={
        `${styles.orderPopup} fixed bottom-4 inset-x-4 rounded-xl h-[60px] bg-cyan-400 p-4 text-xl text-light flex justify-between items-center` +
        (order.length === 0 ? ' translate-y-12 opacity-0' : ' opcaity-100 translate-y-0')
      }>
        <div>Ilość dań: {order.length}</div>
        <button onClick={() => createOrder(order)} className='py-2 px-4 rounded-xl bg-cyan-200 text-cyan-700'>Złóż zamówienie</button>
      </div>
    </>
  );
}