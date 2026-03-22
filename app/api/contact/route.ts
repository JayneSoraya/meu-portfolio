import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';
import { put } from '@vercel/blob'; 

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    const files = formData.getAll('files') as File[];
    const anexosUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const blob = await put(`contatos/${Date.now()}-${file.name}`, file, {
          access: 'public',
        });
        anexosUrls.push(blob.url); 
      }
    }

    await sql`
      INSERT INTO contact_messages (name, email, message, anexos_urls)
      VALUES (${name}, ${email}, ${message}, ${anexosUrls})
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let linksHtml = '';
    let linksText = '';
    if (anexosUrls.length > 0) {
      linksHtml = `
        <h3 style="color: #9333ea; margin-top: 20px; font-size: 16px;">Anexos enviados (${anexosUrls.length}):</h3>
        <ul style="padding-left: 20px;">
          ${anexosUrls.map(url => `<li style="margin-bottom: 8px;"><a href="${url}" target="_blank" style="color: #9333ea; text-decoration: none;">Abrir Arquivo</a></li>`).join('')}
        </ul>
      `;
      linksText = `\n\nAnexos:\n${anexosUrls.join('\n')}`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email, 
      subject: `Novo Contato Portfolio: ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}${linksText}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #9333ea; margin-top: 0;">Nova mensagem do site!</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #9333ea; border-radius: 4px;">${message}</p>
          ${linksHtml}
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Enviado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Erro ao processar contato' }, { status: 500 });
  }
}