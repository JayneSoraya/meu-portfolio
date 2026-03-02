import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";
import nodemailer from "nodemailer";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const users = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      
      return NextResponse.json({ message: "Se o e-mail existir, um link de recuperação será enviado." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); 

    await sql`
      UPDATE users 
      SET reset_token = ${token}, reset_token_expiry = ${expiry} 
      WHERE email = ${email}
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: '"Seu Portfólio" <seu-email@gmail.com>',
      to: email,
      subject: "Recuperação de Senha",
      html: `<p>Você solicitou a troca de senha. Clique no link abaixo:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Este link expira em 1 hora.</p>`,
    });

    return NextResponse.json({ message: "E-mail enviado com sucesso!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}