import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherSever } from "@/lib/pusher";

export async function POST(request) {
  try {
    const { message, image, conversationId } = await request.json();

    const currentUser = await getCurrentUser();

    console.log(currentUser);
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },

        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },

      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },

      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherSever.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherSever.trigger(user.email, "conversation:update", {
        id: conversationId,
        messaages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
