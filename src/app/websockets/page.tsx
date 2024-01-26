"use client";

import Pusher from "pusher-js";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? ''
    });

    const channel = pusher.subscribe('chat');
    channel.bind('chat-event', (data: any) => {
      console.log(JSON.stringify(data));
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, [])


  return (
    <>
      <div>test</div>
    </>
  );
}