import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeevan Bhargav | React Native Developer Portfolio",
  description: "Explore the professional developer portfolio of Jeevan Bhargav, a React Native Application Developer specializing in high-performance mobile apps, custom UI implementations, and full-stack integrations.",
  keywords: ["React Native", "Mobile App Developer", "Jeevan Bhargav", "Indore", "Developer Portfolio", "iOS", "Android", "Next.js Developer"],
  authors: [{ name: "Jeevan Bhargav" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030014] text-slate-100 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200`}>
        {children}
      </body>
    </html>
  );
}
