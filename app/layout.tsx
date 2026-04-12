import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Pos PAUD Melati Bangsi | Pendidikan Anak Usia Dini Terpercaya",
  description:
    "Pos PAUD Melati Bangsi — lembaga pendidikan anak usia dini di Singosari, Malang yang mendampingi tumbuh kembang anak dengan pendekatan holistik, bermain, dan penuh kasih sayang.",
  keywords: ["PAUD", "Melati Bangsi", "Singosari", "Malang", "pendidikan anak", "PAUD Malang"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${nunito.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
