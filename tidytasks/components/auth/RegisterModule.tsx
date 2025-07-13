"use client";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import Image from "next/image";
import Silk from "../ui/Silk";
import { Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const RegisterModule = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex w-70% h-full p-1">
      {/* Left Side: Image */}
      <div className="w-1/2 relative overflow-hidden bg-green-100 flex justify-center items-center rounded-2xl">
        <div className="absolute inset-0 z-0">
          <Silk
            speed={7}
            scale={1.2}
            color="#24FFAB"
            noiseIntensity={0}
            rotation={0}
          />
        </div>
        <div className="z-10">
          <Image
            src="/logo.png"
            alt="Register Visual"
            width={400}
            height={400}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Right Side: Register Content */}
      <div className="relative w-1/2 mx-auto bg-green-100 shadow-md p-8 rounded-2xl">
        <div className="flex flex-col items-center gap-6 mt-20">
          <h1 className="text-5xl font-semibold text-emerald-950 text-center">
            Sign Up
          </h1>

          <h2 className="text-sm font-medium text-emerald-950 text-center">
            Create an account to join TidyTasks and simplify task management!
          </h2>

          {/* Form */}
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Username (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <IoPersonSharp className="text-xl text-gray-600" />
            </div>

            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="text-xl text-gray-600" />
            </div>

            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="text-xl text-gray-600" />
            </div>

            <div className="flex items-center gap-2">
              <input
                className="input input-bordered w-full p-4"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FaLock className="text-xl text-gray-600" />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 text-center">{errorMsg}</p>
            )}

            <div className="mt-2 flex justify-center">
              <Button
                onClick={handleRegister}
                sx={{
                  color: "white",
                  border: "outline",
                  px: 2,
                  borderColor: "black",
                  fontFamily: "Inter, sans-serif",
                  background:
                    "linear-gradient(-45deg, #AFF8C8, #0F2830, #AFF8C8, #0F2830)",
                  backgroundSize: "400% 400%",
                  ":hover": {
                    boxShadow: "0 2px 2px #1D5527",
                    transform: "scale(1.05)",
                  },
                  animation: `${gradientAnimation} 5s linear infinite`,
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModule;
