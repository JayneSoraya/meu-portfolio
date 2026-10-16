import { NextResponse } from "next/server";
import { sql } from '@/lib/db';
import bcrypt from "bcryptjs";

// Função feita para cumprir os requisitos de segurança da senha, como mínimo de caracteres, números, letras maiúsculas e minúsculas, e caracteres especiais.
function isPasswordStrong(password: string): boolean {
  // a. Mínimo de 8 caracteres
  const minLength = password.length >= 8;
  // b. Mínimo de 2 números
  const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;
  // c. Mínimo de 1 caractere especial (!@#$%^&*(),.?":{}|<>)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\-_=+\\\/\[\]]/.test(password);
  // d. Mínimo de 1 letra maiúscula
  const hasUpperCase = /[A-Z]/.test(password);
  // e. Mínimo de 1 letra minúscula
  const hasLowerCase = /[a-z]/.test(password);

  return minLength && hasTwoNumbers && hasSpecialChar && hasUpperCase && hasLowerCase;
}

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if(!token || !newPassword) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }
    if(!isPasswordStrong(newPassword)) {
      return NextResponse.json({ error: "A senha não atende aos requisitos de segurança: mínimo de 8 caracteres, 2 números, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula." }, { status: 400 });
    }

    const users = await sql`
      SELECT id FROM users 
      WHERE reset_token = ${token} 
      AND reset_token_expiry > NOW()
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
    }

    //Senha com Hash e Salt requisitos de segurança, para garantir que a senha seja armazenada de forma segura no banco de dados.
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