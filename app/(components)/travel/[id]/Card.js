"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { getTimeAndDate } from "@/lib/parseDateTime";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

export default async function Card({
  id,
  usersId,
  from,
  to,
  date,
  username,
  name,
  friends,
  currentUsername,
  senderId
}) {
  const [bookingDate, bookingTime] = getTimeAndDate(date);
  const [refetch, setRefetch] = useState(false);
  async function handleAcceptRequest() {
    const res = await fetch("/api/acceptrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: id,
        userId: senderId
      }),
    });
    if (res.ok) {
      toast.success("Accepted");
      let timer = setTimeout(() => {
        window.close();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      toast.error("Oops! Something went wrong");
    }
  }
  const friendSet = new Set();
  if (friends && friends.length > 0) {
    friends.map(({ travelId, friendId }) => friendSet.add([travelId,friendId].toString()));
  }
  
  return (
    <CardContainer className="inter-var mt-12 mb-12 p-4">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[100%] sm:w-[25rem] h-auto rounded-xl p-6 border ">
        <CardItem className="w-full mt-1">
          <Image
            alt={name}
            src={
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl"
          />
        </CardItem>
        <div className="mt-2 mb-2">
          <Link href={`/user/${username}`}>
            <CardItem className="text-xl font-bold text-neutral-600 dark:text-white">
              {username === currentUsername ? "You" : username}
            </CardItem>
          </Link>
          <CardItem
            as="div"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-red flex flex-col w-full"
          >
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Date: {bookingDate}</p>
            <p>Time: {bookingTime}</p>
          </CardItem>
        </div>
        <div className="flex justify-between items-center gap-4 font-bold">
          <CardItem
            as="button"
            className={`px-4 py-2 rounded-xl text-xs bg-gray-300 dark:text-black w-full hover:bg-gray-400 ${
              friendSet.has([id,senderId].toString()) &&
              "opacity-50 hover:opacity-50 hover:bg-gray-300 cursor-not-allowed"
            }`}
            onClick={handleAcceptRequest}
            disabled={friendSet.has([id,senderId].toString())}
          >
            {friendSet.has([id,senderId].toString()) ? "Accepted 😊" : "Accept 🤔"}
          </CardItem>
          <CardItem
            as="button"
            className="px-4 py-2 rounded-xl bg-red-500/40 text-black dark:text-white text-xs w-full hover:bg-red-500/70"
            onClick={() => window.close()}
          >
            Decline
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
