"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full mb-10">
      <nav className="navbar bg-green-100 shadow-sm p-5 flex w-full items-center">
        <Image
          src="/logo.png"
          width={40}
          height={30}
          alt="TidyTasks"
          className="rounded-full mr-2"
        />
        <span className="text-2xl font-bold text-emerald-900">TidyTasks</span>
      </nav>
    </header>
  );
};

export default Navbar;
