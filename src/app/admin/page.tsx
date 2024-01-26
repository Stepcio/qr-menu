"use client";

import { testWebsockets } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function Page() {
  const [state, formAction] = useFormState(testWebsockets, {message: ''});

  return (
    <>
      <form action={formAction}>
        <input className="text-black" type="text" name="message" required/>
        <button type="submit">Submit</button>
      </form>
      <div>{state?.message}</div>
    </>
  );
}