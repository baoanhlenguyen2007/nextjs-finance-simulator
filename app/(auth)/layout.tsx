import React from "react";
import Background from "@/public/images/auth-bg.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden flex-1 p-2 lg:block ">
        <Image
          src={Background}
          alt={"bg-auth"}
          className="size-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
