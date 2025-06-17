import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Navbar from '@/components/shared/Navbar';
import SessionWrapper from '@/components/shared/SessionWrapper';
import "./globals.css";

const fontSans = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "imagenation",
  description: "Free and open source images for everyone. No attribution required, no subscription, just images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} antialiased`}
      >
        <SessionWrapper>
          <Navbar />
          <main className="max-w-[1536px] container min-h-screen px-3 mx-auto">
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
