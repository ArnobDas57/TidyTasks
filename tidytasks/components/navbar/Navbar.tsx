"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className={`w-full mb-10`}>
      <nav className="navbar bg-green-100 shadow-sm p-5 flex w-full items-center justify-between">
        {/* Left Side: Logo + Title */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="TidyTasks"
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-emerald-900">TidyTasks</span>
        </div>

        {/* Right Side: Menu Links */}
        {pathname.includes("/login") || pathname.includes("/register") ? (
          <div className="flex gap-5 font-medium">
            <Link
              href="/login"
              className={`${
                pathname === "/login"
                  ? "bg-emerald-200 hover:text-green-800 text-black"
                  : "bg-emerald-950 hover:text-green-300 text-white"
              } p-2 rounded-sm font-bold cursor-pointer`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`${
                pathname === "/register"
                  ? "bg-emerald-200 hover:text-green-800 text-black"
                  : "bg-emerald-950 hover:text-green-300 text-white"
              } p-2 rounded-sm font-bold cursor-pointer`}
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex gap-5 font-medium">
            <Link
              href="/login"
              className="bg-emerald-200 hover:text-green-800 text-black p-2 rounded-sm font-bold cursor-pointer"
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
