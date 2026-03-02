import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    const users = await sql`
      SELECT id FROM users 
      WHERE reset_token = ${token} 
      AND reset_token_expiry > NOW()
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}, 
          reset_token = NULL, 
          reset_token_expiry = NULL 
      WHERE id = ${users[0].id}
    `;

    return NextResponse.json({ message: "Senha atualizada com sucesso!" });

  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}