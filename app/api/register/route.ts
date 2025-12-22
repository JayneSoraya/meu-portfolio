import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();

    // 1. Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 2. Inserir no banco de dados
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${nome}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erro ao cadastrar: " + error.message }, { status: 500 });
  }
}