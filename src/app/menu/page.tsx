import Image from 'next/image'

export default function Home() {
  return (
    <main className='h-full w-full bg-white flex-column ' >
    <div className='h-12 w-full flex pt-3 justify-center align-middle text-center bg-white '>
      QRMENU
    </div>

    <div className='h-[100vh] w-full p-8 flex-column   justify-center  bg-gray-200 '>
    
      <div className='p-2 mx-[5%]  flex rounded-3xl   w-[90%] bg-green-200 ' >

        <Image src="/burger.jpg" width={120} height={100} className='rounded-3xl' />  


        <div className='p-2 mx-[5%] font-bold rounded-3xl  block w-[90%] bg-green-200 ' >
          Burger Siemano
          <div className='  font-light rounded-3xl  block w-[90%] bg-green-200 ' >
          Bułka, mięso, ogórek, ser, sos autorski
          </div>
        </div>
      </div>


      <div className='p-2 mx-[5%] flex mt-10 rounded-3xl  w-[90%] bg-green-200 ' >
      <Image src="/burger.jpg" width={100} height={100} className='rounded-3xl' />  

        <div className='p-2 mx-[5%] font-bold rounded-3xl  block w-[90%] bg-green-200 ' >
          Burger Siemano
          <div className='  font-light rounded-3xl  block w-[90%] bg-green-200 ' >
          Bułka, mięso, ogórek, ser, sos autorski
          </div>
        </div>
      </div>

      <div className='p-2 mx-[5%] flex mt-10 rounded-3xl  w-[90%] bg-green-200 ' >
      <Image src="/burger.jpg" width={100} height={100} className='rounded-3xl' />  

        <div className='p-2 mx-[5%] font-bold rounded-3xl  block w-[90%] bg-green-200 ' >
          Burger Siemano
          <div className='  font-light rounded-3xl  block w-[90%] bg-green-200 ' >
          Bułka, mięso, ogórek, ser, sos autorski
          </div>
        </div>
      </div>

    </div>
  </main>
  )
}
