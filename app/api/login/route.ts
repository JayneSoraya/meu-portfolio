import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import  bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { error } from "console";

export async function POST(request: Request) {
    try{
        const {email, senha} = await request.json();
        const result = await sql `SELECT * FROM users WHERE email = ${email}`;
        const user = result.rows[0];

        if(!user || !(await bcrypt.compare(senha, user.password))){
            return NextResponse.json({error: "Credenciais inválidas"}, {status:401});
        }

        cookies().set("portifolio_token", "Usuário_logado_com_sucesso", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60* 60 * 24,
            path: "/",
        });

        return NextResponse.json({
            message: "Login realizado!",
            user: {nome: user.name}
        });
    } catch(error){
        return NextResponse.json({ error: "Erro interno"}, {status: 500});
    }
}