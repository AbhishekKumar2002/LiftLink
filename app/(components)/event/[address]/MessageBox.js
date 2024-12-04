"use client";

import React from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import {format} from "date-fns"

const MessageBox = ({ isLast, key, data }) => {
  const session = useSession();

  var isOwn = false;

  if (session?.data?.user?.email == data?.sender?.email) {
    isOwn = true;
  }

  const seenList = (data.seen || [])
    .filter((user) => user.email != data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  const container = clsx("flex gap-3 p-4 ", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body1 = clsx("flex flex-col gap-2 bg-amber-500/50  p-2", isOwn?"rounded-l-xl":"rounded-r-xl" );

  const message = clsx(
    " text-sm w-full overflow-hidden  p-2",
    isOwn ? "bg-sky-500 text-white rounded-l-xl" : "bg-black text-white rounded-r-xl "
  );

  return (
    <div className={container}>
    <div className={body1}>
      <div className="flex items-center gap-1"> 
       
       <div className="text-sm text-grey-500">{data.sender.name}</div>
       <div className="text-xs text=grey-400">
        {format(new Date(data.createdAt),'p')}
       </div>
        
      </div>

      <div className={message}><div>{data.body}</div></div>
    </div>
       </div>
  );
};

export default MessageBox;
