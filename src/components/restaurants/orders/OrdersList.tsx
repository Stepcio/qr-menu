'use client';
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { MenuItem as MenuItemType } from "@prisma/client";
import MenuItem from "../items/MenuItem";

type Params = {
  menuItems: MenuItemType[]
}

type Order = {
  name?: string,
  items?: MenuItemType[]
}

export default function OrdersList({ menuItems }: Params) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? ''
    });

    const channel = pusher.subscribe('orders');
    channel.bind('order-added', (data: any) => {
      const items = data.order.items?.map((itemId: number) => {
        return menuItems.find(i => i.id === itemId);
      })

      setOrders(orders => [...orders, {
        name: data.order.name,
        items: items,
      }]);
    });

    return () => {
      pusher.unsubscribe('orders');
    };
  }, [])

  return (
    <>
      {orders.map((order, index) => (
        <div key={index} className='mt-4'>
          Zamówienie złożone przez: { order.name }
          {order.items?.map((item, innerIndex) => (
            <MenuItem key={innerIndex} item={item} preview={true}/>
          ))}
        </div>
      ))}
    </>
  )
}