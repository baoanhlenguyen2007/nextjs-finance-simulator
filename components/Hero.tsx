"use client";

import Image from "next/image";
import React from "react";
import HeroBG from "@/public/images/hero.png";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Hero = () => {
  const pathname = usePathname();
  const isDisplay = pathname === "/";
  
  const handleScrollDown = () => {
    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", isDisplay ? "block" : "hidden")}>
      <Image
        src={HeroBG}
        alt="hero-bg"
        className="h-[900px] w-full bg-center object-cover"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white lg:left-40 lg:translate-x-0">
        <p className="text-center text-4xl font-bold leading-tight md:text-7xl">
          Look first/ <br /> Then leap.
        </p>
        <p className="text-center text-base md:text-xl">
          The best trades require research, then commitment.
        </p>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer">
        <ChevronDown color="white" onClick={handleScrollDown} />
      </div>
    </div>
  );
};

export default Hero;
