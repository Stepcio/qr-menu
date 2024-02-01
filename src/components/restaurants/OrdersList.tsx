'use client';

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { MenuItem as MenuItemType } from "@prisma/client";
import MenuItem from "./MenuItem";

type Params = {
  menuItems: MenuItemType[]
}

export default function OrdersList({ menuItems }: Params) {
  const [orders, setOrders] = useState<MenuItemType[][]>([])

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? ''
    });

    const channel = pusher.subscribe('kitchen');
    channel.bind('order-added', (data: any) => {
      const items = data.order.map((itemId: number) => {
        return menuItems.find(i => i.id === itemId);
      })

      setOrders(orders => [...orders, items]);
    });

    return () => {
      pusher.unsubscribe('kitchen');
    };
  }, [])

  return (
    <>
      {orders.map((order, index) => (
        <div key={index}>
          Zamówienie złożone przez:
          {order.map((item, innerIndex) => (
            <MenuItem key={innerIndex} item={item}/>
          ))}
        </div>
      ))}
    </>
  )
}