// components/ClientLayout.tsx
"use client";

import Navbar from "@/components/navbar/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatch
    setRendered(true);
  }, []);

  if (!rendered) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
        <main className="flex-grow px-2">{children}</main>
      </motion.div>
    </AnimatePresence>
  );
}
