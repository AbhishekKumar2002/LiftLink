import { NextResponse } from "next/server";
import { addTravelData } from "./addtraveldata";

export async function POST(req){
    try {
        const { username, from, to, date, onlyDate } = await req.json()
        const res = await addTravelData(username,from,to,date,onlyDate)
        return NextResponse.json({
            message: "added"
        },{
            status: 201
        })
    } catch(err){
        return NextResponse.json({
            message: err.message,
        },{
            status: 500
        })
    }
}

export async function GET(){
    try {
        return NextResponse.json({
            "message": 'hello'
        })
    } catch(err){
        return NextResponse.json({
            message: err.message,
        },{
            status: 500
        })
    }
}