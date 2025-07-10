"use client";
import React from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";

const LoginModule = () => {
  return (
    <div className="flex w-70% h-full p-1">
      {/* Left Side: Login Content */}
      <div className="relative w-1/2 mx-auto bg-green-100 rounded-lg shadow-md p-8">
        {/* Centered content */}
        <div className="flex flex-col items-center gap-6 mt-20">
          <h1 className="text-5xl font-semibold text-emerald-950 text-center">
            Welcome back!
          </h1>

          <h2 className="text-sm font-medium text-emerald-950 text-center">
            Please enter your email and password to access your account
          </h2>

          {/* Login Form */}
          <form className="w-full flex flex-col gap-6 mt-4" action="login">
            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Username/Email"
              />
              <MdEmail className="text-xl text-gray-600" />
            </div>

            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Password"
                type="password"
              />
              <FaLock className="text-xl text-gray-600" />
            </div>

            <label className="label justify-start">
              <input type="checkbox" defaultChecked className="checkbox mr-2" />
              Remember Me
            </label>

            <div className="mt-2">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-1/2 relative bg-green-100 justify-items-center">
        <Image
          src="/logo.png"
          alt="Login Visual"
          width={400}
          height={400}
          className="rounded-full mt-20"
        />
      </div>
    </div>
  );
};

export default LoginModule;
