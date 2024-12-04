import { db } from "@/lib/db";

export async function getMessages (conversationId) {
  try {
    console.log("hi")
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {

    console.log(error)
    return [];
  }
};


