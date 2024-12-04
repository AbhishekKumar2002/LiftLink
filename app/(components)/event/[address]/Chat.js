"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Formi from "./Formi";
import Header from "./Header";
import Message from "./Message";
import { useSession } from "next-auth/react";

const Chat = ({ usersId, name, cardId }) => {
  const { data: session, status } = useSession();

  const [conversationId, setConversation] = useState("");
  const [messa, setMessa] = useState([]);

  // Fetch conversationId
  useEffect(() => {
    async function fetchConversation() {
      if (!session) return;

      try {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user?.email,
            usersId,
            cardId,
          }),
        });

        const conver = await res.json();
        setConversation(conver.id); // Set conversationId
        console.log(conver.id);
      } catch (error) {
        console.error("Failed to fetch conversation", error);
      }
    }
    fetchConversation();
  }, [session, usersId, cardId]);

  // Fetch messages based on conversationId
  useEffect(() => {
    async function fetchMessages() {
      if (conversationId.length === 0) return;

      try {
        const result = await fetch(
          `/api/usermessage?conversationId=${conversationId}`
        );
        const resul = await result.json();
        setMessa(resul); // Set messages
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }
    fetchMessages();
  }, [conversationId]);

  return (
    <div className="h-fit w-full">
      <Header name={cardId} />
      <Message conversationId={conversationId} />
      <Formi conversationId={conversationId} />
    </div>
  );
};

export default Chat;
