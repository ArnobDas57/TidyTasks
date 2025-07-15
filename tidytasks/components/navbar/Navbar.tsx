"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const supabase = useSupabaseClient();

  // All public pages
  const publicPages = ["/", "/login", "/register", "/forgotpassword"];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="w-full mb-5">
      <nav className="navbar bg-green-100 shadow-sm p-5 flex w-full items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="TidyTasks"
            className="rounded-full"
          />
          <Link
            href="/"
            className="animated-gradient-text text-2xl font-bold tracking-wider"
          >
            TidyTasks
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex gap-5 font-medium items-center">
          {/* Show login/register on all public pages when not logged in */}
          {!session && publicPages.includes(pathname) && (
            <>
              <Link
                href="/login"
                className={`${
                  pathname === "/login"
                    ? "bg-emerald-400 hover:text-green-800 text-black"
                    : "bg-emerald-950 hover:text-green-300 text-white"
                } p-2 rounded-sm font-bold cursor-pointer`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`${
                  pathname === "/register"
                    ? "bg-green-400 hover:text-green-800 text-black"
                    : "bg-emerald-950 hover:text-green-300 text-white"
                } p-2 rounded-sm font-bold cursor-pointer`}
              >
                Register
              </Link>
            </>
          )}

          {/* Show logout when logged in */}
          {session && (
            <Button
              onClick={handleLogout}
              className="bg-green-400 hover:bg-green-700 text-white p-2 rounded-sm font-bold cursor-pointer"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
