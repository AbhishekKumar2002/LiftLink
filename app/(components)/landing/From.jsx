"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { getTimeAndDate } from "@/lib/parseDateTime";

const From = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (datestring) => {
    setSelectedDate(datestring);
  };
  const [input, setInput] = useState("");
  const [toinput, tosetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (value) => {
    setInput(value);
  };

  const tohandleChange = (value1) => {
    tosetInput(value1);
  };

  const handleAddData = async () => {
    if (!session || !session?.user) {
      toast.error("Please login first");
      return router.push("/login");
    }
    const username = session.user.username;
    try {
      if (
        input.trim().length === 0 ||
        toinput.trim().length === 0 ||
        !selectedDate
      ) {
        toast.error("Add all the field");
        return;
      }
      if(selectedDate < new Date()){
        toast.error(`Please check your date and time.\n Current DateTime: ${new Date()}`)
        return
      }
      setLoading(true);
      const res = await fetch("/api/addtravel", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          from: input.trim().toLowerCase(),
          to: toinput.trim().toLowerCase(),
          date: selectedDate,
          onlyDate: getTimeAndDate(selectedDate)[0]
        }),
      });
      if (res.ok) {
        toast.success("Successfully Created ✅");
        setLoading(false);
      } else {
        toast.error("Already Have ❌");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong 😥");
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <div id="frto" className="w-[80%] md:mt-0 mt-28">
        <BackgroundGradient className="flex flex-col rounded-[22px] w-full p-4 sm:p-10 bg-slate-300 dark:bg-zinc-900">
          <div className="flex items-center justify-center">
            <h1 className="font-extrabold font-sans text-3xl">
              Share Safe, Ride Together
            </h1>
          </div>
          <form>
            <div className="flex flex-col mt-4">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                placeholder="From"
                className="w-full mt-2 p-2 border rounded"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                placeholder="To"
                className="w-full mt-2 p-2 border rounded"
                value={toinput}
                onChange={(e) => tohandleChange(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="dateTime">Date/Time</label>
              <br />
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Date and Time"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full">
              <div className="w-full">
                <Link href={`/event/${input.trim().toLowerCase()}&${toinput.trim().toLowerCase()}&${getTimeAndDate(selectedDate)[0]}`}>
                  <button
                    type="button"
                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Search
                    </span>
                  </button>
                </Link>
              </div>
              <div className="w-full p-4">
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    Add your card
                  </button>
                </DialogTrigger>
              
              
                <DialogContent className="bg-white dark:bg-black dark:text-white border-none space-y-4">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      From: {input} <br />
                      To: {toinput} <br />
                      Date: { getTimeAndDate(selectedDate)[0] } <br />
                      Time: { getTimeAndDate(selectedDate)[1] } <br />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button className="shadow-sm shadow-black dark:shadow-white">
                        Discard
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-black text-white hover:bg-black/95 dark:bg-white dark:text-black"
                      onClick={handleAddData}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </div>
            </div>
          </form>
        </BackgroundGradient>
      </div>
    </Dialog>
  );
};

export default From;
