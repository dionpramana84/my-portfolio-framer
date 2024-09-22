import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import StickyCursor from "@/components/sticky-cursor";
import HeaderLayout from "@/components/header-layout";
import Template from "./template";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dion Portofolio",
  description:
    "Portofolio of Dion Pramana Utama. Powered by Next.js, Shadcn UI, and Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Template>
            <HeaderLayout />
            <main>
              <StickyCursor />
              {children}
            </main>
            <Footer />
          </Template>
        </ThemeProvider>
      </body>
    </html>
  );
}
