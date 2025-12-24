import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  console.log("Recebi uma tentativa de CADASTRO!");
  try {
    const { nome, email, senha } = await request.json();

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha,saltRounds);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${nome}, ${email}, ${senhaCriptografada})
    `;

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message :  "Erro desconhecido";
    return NextResponse.json({ error: "Erro ao cadastrar: " + errorMessage }, { status: 500 });
  }
}