import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const exuserbyun = await db.users.findUnique({
      where: { username: body?.username },
    });
    const exuserbyemail = await db.users.findUnique({
      where: { email: body?.email },
    });

    
    if(exuserbyemail && exuserbyemail.isVerified === false){
        return NextResponse.json({
            message: "Unverified"
        }, {
            status: 400
        })

    }
    if(exuserbyun && exuserbyun.isVerified === false){
        return NextResponse.json({
            message: "Unverified"
        }, {
            status: 400
        })
    }

    return NextResponse.json({
        message: "Verified"
    },{
        status: 200
    })
  } catch (err) {
    console.log(err);
  }
}
