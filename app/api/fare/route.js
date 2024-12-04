const { NextResponse } = require("next/server");

export async function GET(req)
{   const {searchParams}=new URL(req.url)


     const pick=searchParams.get("pickUp");
      const drop=searchParams.get("dropLocation");
    console.log(pick)
    console.log(drop)
      
    try{
        const res = await fetch(
            `https://uber-api-tww1.onrender.com/price/?pickup_location=${pick}&dropoff_location=${drop}`
        );
        const price = await res.json();
        return NextResponse.json(
            {
                price,
            },
            {
                status:200
            }

            
        );

    }catch(err)
    {   console.log(err)
        return NextResponse.json(
            {
                message: err.message,
            },
            {
                status:500
            }
        )
    }
}
