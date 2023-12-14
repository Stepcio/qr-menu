import Link from 'next/link'

export default function Home() {
  return (
    <main className='h-full w-full bg-white flex-column'>
      <div className='h-12 w-full flex pt-3 justify-center align-middle text-center bg-white'>
        QRMENU
      </div>
      <div className='h-[100vh] w-full p-8 flex-column justify-center bg-gray-200'>
        <Link href='/menu'>
          <button className='p-2 mx-[5%] rounded-3xl block w-[90%] bg-green-200'>
              Menu
          </button>
        </Link>

        <button className='p-2 mx-[5%] rounded-3xl mt-10 block w-[90%] bg-green-200'>
          zamów kelnera
        </button>

        <button className='p-2 mx-[5%] mt-10 rounded-3xl block w-[90%] bg-green-200'>
          złóż zamówienie
        </button>
      </div>
    </main>
  )
}

