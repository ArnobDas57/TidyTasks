"use client";
import React from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginModule = () => {
  return (
    <div className="flex flex-col items-center gap-10 p-8 w-4/5 h-180 mx-auto bg-green-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-emerald-950 text-center">
        Welcome back!
      </h1>

      <h2 className="text-2xs font-semibold text-emerald-950 text-center">
        Please enter your email and password to access your account
      </h2>

      {/* Login Form */}
      <form className="w-90 flex flex-col gap-10 p-2 mt-10">
        <div className="flex">
          <input
            className="input w-full required"
            placeholder="Username/Email"
          />
          <MdEmail />
        </div>

        <div className="flex">
          <input className="input w-full required:" placeholder="Password" />
          <FaLock />
        </div>

        <label className="label">
          <input type="checkbox" defaultChecked className="checkbox mr-2" />
          Remember Me
        </label>

        <div className="mt-2">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginModule;
