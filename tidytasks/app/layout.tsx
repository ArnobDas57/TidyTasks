import type { Metadata } from "next";
import "@/components/ui/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "TidyTasks",
  description: "Simplifiy your task management",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-green-200 font-sans">
        <Navbar />
        <main className="flex-grow px-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
