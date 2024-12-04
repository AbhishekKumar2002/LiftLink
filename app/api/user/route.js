import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { random } from "glowing-engine";
import nodemailer from 'nodemailer'

export async function POST(req) {
  const formSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_.]{3,}$/, {
      message:
        "Username must be at least 3 characters and can only contain alphabets, numbers, underscore, and dot.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }).refine(email => email.endsWith("@iiitl.ac.in"), {
      message: "Email domain must be @iiitl.ac.in",
    }),
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    gender: z.string().min(1, {
      message: "Please Select your Gender",
    }),
    userimg: z.string().min(0, {
      message: "Please Select your image",
    }),
  });

  try {
    const body = await req.json();
    const { username, email, password, name, gender, userimg } =
      formSchema.parse(body);

    const exuserbyemail = await db.users.findUnique({
      where: { email: email },
    });
    if (exuserbyemail && exuserbyemail.isVerified) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const exuserbyun = await db.users.findUnique({
      where: { username: username },
    });
    if (exuserbyun && exuserbyun.isVerified) {
      return NextResponse.json(
        { message: "username already exists" },
        { status: 409 }
      );
    }

    const haspass = await hash(password, 10);

    const otp = random.randomNumberInRange(100000, 999999);
    if(exuserbyemail || exuserbyun){
      await db.users.update({
        where: {
          email
        },
        data: {
          otp
        }
      })
    }else{
      const newUser = await db.users.create({
        data: {
          username,
          email,
          password: haspass,
          name,
          gender,
          userimg,
          otp,
          isVerified: false,
        },
      });
    }
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      const mail = {
        from: "Live Beta <deadbeta062@gmail.com>",
        to: email,
        subject: "Confirm your Live Beta account",
        html: `<p>Please use the following One Time Password(OTP) to verify your live beta account.<h2>${otp}</h2><br />Thankyou ! 😊<br /> <a href="https://dead-beta.vercel.app/">Live Beta</a></p>`,
      };
      const res = await transporter.sendMail(mail);
      return Response.json(res);
    } catch (error) {
      return Response.json({ error });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Registration UnSuccessful" },
      { status: 420 }
    );
  }
}
