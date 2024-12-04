import { NextResponse } from "next/server";
import { deleteTravelhistory } from "./deletetravelhistory";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    console.log({ id });
    const res = await deleteTravelhistory(id);
    console.log(res);
    return NextResponse.json({
      message: "ok",
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
