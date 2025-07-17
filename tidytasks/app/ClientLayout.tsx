"use client";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(
    () => createClientComponentClient() // You can omit <Database> if you haven't set it up
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
