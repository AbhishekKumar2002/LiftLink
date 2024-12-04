import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { cardId, userId } = await req.json();
    const res = await db.friends.create({
      data: {
        travelId: cardId,
        friendId: userId,
      },
    });
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
