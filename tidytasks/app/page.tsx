"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import CurvedLoop from "@/components/ui/CurvedLoop";
import Silk from "@/components/ui/Silk";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Squares */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={7}
          scale={1.2}
          color="#24FFAB"
          noiseIntensity={0}
          rotation={0}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-b from-green-100/80 to-green-300/80 backdrop-blur-sm">
        <div className="w-full max-w-2xl text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Simplify Your Workflow.
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            TidyTasks helps you organize, prioritize, and conquer your day —
            with zero stress and maximum clarity.
          </p>
          <div className="flex justify-center">
            <CurvedLoop
              marqueeText="Simplify ✦ Task ✦ Management ✦ With ✦ TidyTasks ✦"
              speed={1}
              curveAmount={100}
              direction="right"
              interactive={true}
              className="text-blue-500 font-bold"
            />
          </div>
          <Button
            variant="outline"
            className="bg-green-400 hover:bg-green-700 hover:scale-105 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200"
          >
            <Link href="/login">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
