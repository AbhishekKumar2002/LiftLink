import React from "react";
import Image from "next/image";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Formi = ({ conversationId }) => {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values) {
       
        const res = await fetch("/api/messages", {
    method: "POST", 
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
       ...values,conversationId
    })
  })


  if(res.ok){
    form.reset()
  }

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white py-4 px-4 border-t flex items-center gap-2 lg:gap-4 w-full"
      >
        <CldUploadButton>
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
      
        <FormField
          className="relative w-full"
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem  className="relative w-full">
              <FormControl>
                <Input
                  placeholder="Your messages"
                  {...field}
                  className="text-black font-light py-2 px-4 rounded-full w-full bg-slate-400"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane />
        </button>
      </form>
    </Form>
  );
};

export default Formi;
