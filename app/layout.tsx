import "./globals.css";

export const metadata = {
  title: "Portfólio Jayne Soraya",
  description: "Portfólio profissional de Jayne Soraya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* Fontes e Ícones */}
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Press+Start+2P&family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <script async src="https://kit.fontawesome.com/6d6952c5be.js" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}