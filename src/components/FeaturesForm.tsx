
// @ts-nocheck
'use client'
import Spinner from './Spinner';
//import { toast } from '../hooks/use-toast';
import { getURL, postData } from '../utils/helpers';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Playfair_Display, Nunito } from 'next/font/google';

const roboto2 = Playfair_Display({
  weight: '700',
  subsets: ['cyrillic'],
});
interface formDataType { [key: string]: FormDataEntryValue }
const responseBody: formDataType = {}

export default function FeedbackForm() {
  const [formData, setformData] = useState()

  const handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    formData.forEach((value, property: string) => responseBody[property] = value);
    console.log(JSON.stringify(responseBody, "form data"))
    const data = {
      contact: responseBody.contact || "",
      message: responseBody.message || "",
    }
    submitForm(data)
  }

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (data) => {
      console.log('mutationFn data', data);
      const url = `${getURL("api/notion")}`;
      console.log(url, "mutationFn url");

      await postData({ url, data })

    },
    onError: (err) => {
      console.log('err', err);

      // toast({
      //   title: 'There was an error.',
      //   description: 'Something went wrong, try resubmit',
      //   variant: 'destructive',
      // })
    },
    onSuccess: () => {
      console.log('success');
      // toast({
      //   title: 'Success',
      //   description: 'Your message submited successfuly and ll be reviewed by our team. We ll reach you as soon as possible',
      //   variant: 'destructive',
      // })
    },
  })


  return (
    <form onSubmit={handleSubmitClick} className="rounded-2xl mt-10 mb-20 p-5 w-full min-w-[300px] flex flex-col items justify-center" style={{ backgroundColor: "rgb(60, 62, 68)" }}>
      <MessageBox />
      <Contacts />
      <SubmitButton />
    </form >
  );
};

function SubmitButton() {
  return <div className="flex justify-end pt-4">
    <button
      className="group cursor-pointer relative flex left select-none items-center justify-center gap-2 px-3 py-1 outline-none focus-visible:ring-4 bg-purple-600 hover:bg-purple-700 rounded h-[36px] whitespace-nowrap text-xs transition ml-2"
      type="submit"
    >
      <span className={`${roboto2.className} select-none font-bold text-white`} >Leave a Message</span>
    </button>
  </div>
}


function MessageBox() {

  return (
    <>
      <div className="bg-zinc-900" >
        <textarea
          name="message"
          className={`${roboto2.className} w-full flex resize-none min-h-[10rem]  p-2 border-0 text-[#9ca3af] bg-zinc-900`}
          placeholder="Whatever..."
        />
      </div>
    </>
  )
}

function Contacts() {

  return (
    <div className="flex">
      <input
        type="text"
        name="contact"
        placeholder="Enter your preferable way to reach you (WA, TG, Email...)"
        className={`${roboto2.className} h-[36px] w-full rounded p-2 mt-4 bg-zinc-900 text-[#9ca3af]`}
      />

    </div>
  );
}
