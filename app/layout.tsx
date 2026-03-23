import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Napoli Pizzéria | Autentikus Olasz Pizza Budapest",
  description:
    "Hagyományos nápolyi pizza fatüzelésű kemencéből. Friss alapanyagok, olasz receptek, budapesti szívvel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain-overlay">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
