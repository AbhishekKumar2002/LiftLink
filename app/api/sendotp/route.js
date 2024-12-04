import nodemailer from 'nodemailer'
import { random } from 'glowing-engine'

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
        const { email, otp } = await req.json()
        const mail = {
            from: "Icy Indulgence <kitishkumar2003@gmail.com>",
            to: email,
            subject: "Confirm your icy indulgence account",
            html: `<p>Please use the following One Time Password(OTP) to verify your icy indulgence account.<h2>${otp}</h2><br />Thankyou ! 🍦😻<br /> <a href="https://icy-indulgence.vercel.app/">Icy Indulgence</a></p>`,
        }
        const res = await transporter.sendMail(mail)
        return Response.json(res)
    } catch (error) {
        return Response.json({ error });
    }
}