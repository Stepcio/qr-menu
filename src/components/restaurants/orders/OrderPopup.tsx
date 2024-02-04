'use client';
import { useEffect, useState } from "react";
import { createOrder } from "@/lib/actions";
import { IoClose } from "react-icons/io5";
import styles from './styles.module.css';

declare global {
  interface Window { Order: number[]; }
}

type Order = {
  name?: string,
  items?: number[]
}

export default function OrderPopup() {
  if (typeof window !== "undefined") {
    window.Order = window.Order || [];
  }

  const [order, setOrder] = useState<Order>({});
  const [name, setName] = useState<string>('');
  const [hasName, setHasName] = useState<boolean>(false);
  const [orderFinished, setOrderFinished] = useState<boolean>(false);
  const [ordersCount, setOrdersCount] = useState<number>(0);

  const updateOrder = () => {
    setOrder({
      name: name,
      items: [...window.Order]
    });
  }

  useEffect(() => {
    if(ordersCount > 0) return;
    
    window.addEventListener('order-change', updateOrder);

    return () => {
      window.removeEventListener('order-change', updateOrder);
  };
  }, [name, ordersCount]);

  const checkName = (e: any) => {
    if(name != '' && name != null && name.length < 32 && name.length > 2){
      setHasName(true);
    }
  }

  const addOrder = () => {
    createOrder(order);
    setOrder({});
    window.Order = []
    setOrderFinished(true);
    setOrdersCount(1);
  }

  const hideOrderFinished = () => {
    setOrderFinished(false);
  }

  return (
    <>
      <div className={
        `${styles.orderPopup} fixed bottom-4 inset-x-4 rounded-xl h-[60px] bg-gray-500 p-4 text-xl text-light font-bold flex justify-between items-center` +
        ((!order.items || order.items.length === 0) ? ' translate-y-12 opacity-0' : ' opcaity-100 translate-y-0')
      }>
        <div>Ilość dań: {order.items?.length}</div>
        <button onClick={addOrder} className='py-2 px-4 rounded-xl bg-dark-teal text-ligth'>Złóż zamówienie</button>
      </div>

      {hasName ? null : (
        <div className='fixed inset-0 bg-black/[.6] z-50 flex'>
          <div className='w-[80%] bg-dim m-auto p-12 rounded-2xl'>
            <label>
              <span className='mr-4'>Wpisz swoje imię:</span>
              <input onInput={e => setName((e.target as HTMLInputElement).value)} className='bg-light rounded-md text-dark' type="text"/>
            </label>
            <button onClick={checkName} className='w-full bg-dark-teal mt-4 rounded-md'>Zatwierdź</button>
          </div>
        </div>
      )}
      
      {orderFinished ? (
        <div onClick={hideOrderFinished} className='fixed inset-0 bg-black/[.6] z-50 flex'>
          <div className='w-[80%] relative bg-dim m-auto p-12 rounded-2xl'>
            <div className='absolute top-0 right-0 mr-2 mt-2'>
              <IoClose className='w-[30px] h-[30px]'/>
            </div>
            <div>
              Pomyślnie złożono zamówienie.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}