import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

  const sql = neon(process.env.DATABASE_URL!);

  export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

      if (!name || !email || !password) {
      return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 });
    }

    const userExist = await sql`SELECT email FROM users WHERE email = ${email}`;
    
    if (userExist.length > 0) {
      return NextResponse.json({ message: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });

  } catch (error: unknown) {
    console.error("ERRO NO REGISTRO:", error);
    return NextResponse.json({ message: "Erro ao criar conta no banco de dados." }, { status: 500 });
  }
}