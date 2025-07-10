import React from "react";
import Image from "next/image";

const Navbar = () => {
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
          <button className="btn btn-primary">Test Button</button>
        </div>

        {/* Right Side: Menu Links */}
        <ul className="flex gap-5 text-emerald-900 font-medium">
          <li>
            <button className="btn btn-outline cursor-pointer hover:text-emerald-600">
              Home
            </button>
          </li>
          <li>
            <button className="btn btn-outline cursor-pointer hover:text-emerald-600">
              About
            </button>
          </li>
          <li>
            <button className="text-green-100 cursor-pointer bg-emerald-950 hover:text-emerald-600">
              Login
            </button>
          </li>
          <li>
            <button className="text-green-100 bg-emerald-950 cursor-pointer hover:text-emerald-600">
              Register
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
