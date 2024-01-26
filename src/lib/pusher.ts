import Pusher from 'pusher';

let pusher: Pusher;
const pusherData = {
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '',
  useTLS: process.env.NODE_ENV === 'production',
}

if (process.env.NODE_ENV === 'production') {
  pusher = new Pusher(pusherData);
} else {
  if (!(global as any).pusher) {
    (global as any).pusher = new Pusher(pusherData);
  }
  pusher = (global as any).pusher;
}

export default pusher;