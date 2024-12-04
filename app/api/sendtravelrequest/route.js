import { db } from "@/lib/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const environment = process.env.NODE_ENV
    const { cardId, email, username, currentUsername } = await req.json();
    
    const card = await db.travel.findUnique({
      where: {
        id: cardId,
      },
      select: {
        from: true,
        to: true,
        date: true,
      },
    });
    const user = await db.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true
      }
    });
    
    const addRequest = await db.requested.create({
      data: {
        usersId: user.id,
        cardId,
        username: currentUsername
      }
    })
    
    const senderId = await db.users.findUnique({ 
      where: {
        username: currentUsername
      },
      select: {
        id: true
      }
    })
    const url = (environment === "development" || environment === "test") ? `http://localhost:3000/travel/${cardId}&${senderId.id}` : `https://dead-beta.vercel.app/travel/${cardId}&${senderId.id}`
    const mail = {
        from: "Live Beta <deadbeta062@gmail.com>",
        to: email,
        subject: "🎉 You've got a new travel request",
        html: `<p>Hello, <strong>${currentUsername}</strong> has sent you a travel request. <h2>From: ${card.from}</h2> <h2>To: ${card.to}</h2> <h2>Date: ${card.date}</h2> <br /> <a href=${url}>View It</a> Thankyou ! 🎉<br /> <a href="https://dead-beta.vercel.app/">Live Beta</a></p>`,
    }
    const res = await transporter.sendMail(mail)
    return Response.json({ res });
  } catch (err) {
    return Response.json({ err });
  }
}
