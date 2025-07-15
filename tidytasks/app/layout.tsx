import type { Metadata } from "next";
import "@/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  title: "TidyTasks",
  description: "Simplify your task management",
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
        <ClientLayout>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
