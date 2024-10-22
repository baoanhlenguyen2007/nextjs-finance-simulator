import React from "react";
import LogoDark from "@/public/images/logo-dark.png";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between bg-dark-2 p-8 xl:px-40">
      <div className="space-y-4">
        <Link href={"/"}>
          <Image src={LogoDark} alt="logo" className="h-10 w-36" />
        </Link>
        <p className="text-base leading-6 text-white">
          9 Vũ Phạm Hàm, Yên Hòa, Cầu Giấy, HN
        </p>
        <p className="text-base leading-6 text-white">(+84) 345 622 345</p>
        <p className="text-base leading-6 text-white">info@gmail.com</p>
      </div>
      <div className="self-end">
        <p className="text-base leading-6 text-white">
          Copyright © 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
