"use client";

import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import Silk from "../ui/Silk";
import { Button } from "../ui/button";
import { Button as MUIButton } from "@mui/material";
import { keyframes } from "@emotion/react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoginModule = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
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
      {/* Left Side: Login Content */}
      <form className="relative w-1/2 mx-auto bg-green-100 shadow-md p-8 rounded-2xl">
        <div className="flex flex-col items-center gap-6 mt-20">
          <h1 className="text-5xl font-semibold text-emerald-950 text-center">
            Welcome back!
          </h1>

          <h2 className="text-sm font-medium text-emerald-950 text-center">
            Please enter your email and password to access your account
          </h2>

          {/* Login Form */}
          <div className="w-full flex flex-col gap-6 mt-4">
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

            <div className="flex">
              <a
                href="/forgotpassword" // update this
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            {errorMsg && (
              <Alert
                variant="destructive"
                className="bg-zinc-200 p-3 my-3 transition-shadow ease-in-out animate-pulse"
              >
                <AlertCircleIcon />
                <AlertTitle>{errorMsg}</AlertTitle>
              </Alert>
            )}

            <div className="mt-2 flex justify-center">
              <MUIButton
                onClick={handleLogin}
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
                Login
              </MUIButton>
            </div>
          </div>
        </div>

        <div className="mt-10 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-green-200 text-emerald-950 relative z-10 p-2 border-zinc-500 rounded-sm">
            Or continue with
          </span>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full bg-green-200"
          >
            <a>
              <FaGithub />
            </a>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full bg-green-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">Login with Google</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full bg-green-200"
          >
            <a>
              <FaLinkedin />
            </a>
          </Button>
        </div>

        <div className="mt-10 text-center text-sm bg-green-200 border-2 p-1">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>

        <div className="mt-10 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking login, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </form>

      {/* Right Side: Image */}
      <div className="relative w-1/2 overflow-hidden flex justify-center items-center bg-green-100 rounded-2xl">
        <div className="absolute inset-0 z-0">
          <Silk
            speed={7}
            scale={1.2}
            color="#24FFAB"
            noiseIntensity={0}
            rotation={0}
          />
        </div>

        <div className="z-10 mt-10">
          <Image
            src="/logo.png"
            alt="Login Visual"
            width={400}
            height={400}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModule;
