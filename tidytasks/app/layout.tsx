import type { Metadata } from "next";
import "@/globals.css";
import Footer from "@/components/footer/Footer";
import ClientLayout from "@/app/ClientLayout";

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
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
