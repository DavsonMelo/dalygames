import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daly Games - Descubra jogos incríveis para se divertir",
  description: "Mais de 10 mil jogos separados e organizados",
  keywords: ["games", "jogos", "aventura", "estratégia", "ação", "plataformas", "steam"],
  openGraph: {
    images: [`${process.env.PROJECT_URL}`] // Substituir no Vercel
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
