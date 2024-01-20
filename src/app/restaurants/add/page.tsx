'use client';

import { createRestaurant } from '@/lib/actions';
import Image from 'next/image';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function Page() {
  const [state, formAction] = useFormState(createRestaurant, {message: ''});

  const [fileUrl, setFileUrl] = useState('');

  return (
    <>
      <form action={formAction}>
        <input className="text-black" type="text" name="name" required/>
        <input type="file" name="logo" id="" />
        {fileUrl.length ? (
          <div className='rounded-md overflow-hidden'>
            <Image
              src={fileUrl}
              width={350}
              height={350}
              objectFit='cover'
              alt='Restaurant logo'
            />
          </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
      <div>{state.message}</div>
    </>
  )
}
