import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req){
    try {
        const { email, otp } = await req.json()
        const user = await db.users.findUnique({
            where: {
                email
            },
            select: {
                otp: true
            }
        })
        if(user.otp === parseInt(otp)){
            await db.users.update({
                where: {
                    email
                },
                data: {
                    isVerified: true
                }
            })
            return NextResponse.json({
                message: "OTP Verified"
            }, {
                status: 200
            })
        }
        return NextResponse.json({
            message: "Wrong OTP"
        },{
            status: 400
        })
    }catch(err){
        console.log(err)
    }
}