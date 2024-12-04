import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");
  try {
    const messages = await db.message.findMany({
      where: {
        convesationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
