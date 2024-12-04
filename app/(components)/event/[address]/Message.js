"use client";
import React, { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { find } from "lodash";
import { pusherClient } from "@/lib/pusher";

const Message = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);

  // console.log(conversationId)

  useEffect(() => {
    async function fn() {
      console.log("from function");
      const result = await fetch(
        `/api/usermessage?conversationId=${conversationId}`
      );

      const resul = await result.json();

      setMessages(resul);
    }
    if (conversationId != "") fn();
  }, [conversationId]);

  const bottomRef = useRef(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    bottomRef?.current?.scrollIntoView();
    console.log("from pusher");

    const messageHandler = (message) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.subscribe(conversationId);

      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="h-96 bg-white w-full text-black overflow-scroll">
      {messages?.map((message, i) => (
        // <p>{message.body}</p>

        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}

      <div ref={bottomRef} className="pt-[234px]" />
    </div>
  );
};

export default Message;
