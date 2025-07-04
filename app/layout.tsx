import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from '@/components/ui/sonner';
import SessionWrapper from '@/components/shared/SessionWrapper';
import "./globals.css";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
          <Toaster
            theme="light"
            position="bottom-center"
            richColors
          />
          <Navbar />
          <main className="max-w-[1536px] container min-h-screen px-3 mx-auto">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
