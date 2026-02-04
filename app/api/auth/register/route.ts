import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres"; // Importe o createPool
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const pool = createPool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 });
    }

    const userExist = await pool.sql`SELECT email from users where email = ${email}`;
    
    if (userExist.rows.length > 0) {
      return NextResponse.json({ message: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });

  } catch (error: any) {
    console.error("ERRO NO BANCO:", error);
    return NextResponse.json({ message: "Erro de conexão com o banco." }, { status: 500 });
  }
}