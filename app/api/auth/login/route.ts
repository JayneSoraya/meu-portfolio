import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
    console.log("Recebi uma tentativa de login!");
    
    try {
        const body = await request.json();
        const email = body.email;
        const senhaCandidata = body.password || body.senha;

        if (!email || !senhaCandidata) {
            console.log("Faltou email ou senha");
            return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
        }

        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        const user = users[0];

        if (!user) {
            console.log("Usuário não encontrado no banco");
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        const senhaValida = await bcrypt.compare(senhaCandidata, user.password);

        if (!senhaValida) {
            console.log("Senha incorreta");
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        cookies().set("portifolio_token", "Usuário_logado_com_sucesso", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return NextResponse.json({
            message: "Login realizado!",
            user: { nome: user.name }
        });

    } catch (err) {
        console.error("Erro no login:", err);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}