import Link from 'next/link';

export default function Page() {
  return (
    <div className='mt-4 mx-auto flex flex-col justify-center gap-4'>
      <Link href='/restaurants' className='mx-auto w-1/2'>
        <button className='p-2 rounded-3xl bg-slate-800 w-full'>
          Restauracje
        </button>
      </Link>
      <Link href='/restaurants/add' className='mx-auto w-1/2'>
        <button className='p-2 rounded-3xl bg-slate-800 w-full'>
          Dodaj restaurację
        </button>
      </Link>
    </div>
  )
}

