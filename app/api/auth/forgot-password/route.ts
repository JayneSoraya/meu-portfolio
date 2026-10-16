import { NextResponse } from "next/server";
import { sql } from '@/lib/db';
import crypto from "crypto";
import nodemailer from "nodemailer";
import { forgotPasswordRatelimit } from "@/lib/ratelimit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
   
    const {success, limit, remaining, reset} = await forgotPasswordRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente mais tarde." },
        { status: 429, headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
         } }
      );
    }
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }
    const users = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      
      return NextResponse.json({ message: "Se o e-mail existir, um link de recuperação será enviado." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000).toISOString(); 

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

    const resetLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password?token=${token}`;
try{
    await transporter.sendMail({
      from: '"Jayne Soraya | Portfólio" <jayne.soraya87@gmail.com>',
  to: email,
  subject: "🔐 Recuperação de Acesso",
  html: `
    <div style="font-family: sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px; max-width: 600px; margin: auto;">
      <h2 style="color: #a855f7; text-align: center; font-size: 24px;">RECUPERAR_SENHA</h2>
      <p style="color: #a3a3a3; text-align: center;">Olá! Recebemos uma solicitação para redefinir a senha da sua conta VIP.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #9333ea; color: #ffffff; padding: 15px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
           Redefinir Minha Senha
        </a>
      </div>

      <p style="color: #737373; font-size: 12px; text-align: center;">
        Se você não solicitou esta alteração, ignore este e-mail.<br>
        O link é válido por apenas <strong>1 hora</strong>.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #262626; margin: 20px 0;">
      
      <p style="color: #525252; font-size: 10px; text-align: center; text-transform: uppercase;">
        Jayne Soraya • Software Engineer
      </p>
    </div>
  `,
    });
  } catch (mailError) {
    await sql`
      UPDATE users 
      SET reset_token = NULL, reset_token_expiry = NULL 
      WHERE email = ${email}
    `;
    throw mailError;
  }
    return NextResponse.json({ message: "E-mail enviado com sucesso!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}