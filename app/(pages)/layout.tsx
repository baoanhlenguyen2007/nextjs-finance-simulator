import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { checkUser } from "@/lib/checkUser";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUser();

  return (
    <div className="bg-gray-50">
      <NavBar userDay={user?.simulation?.currentDay || "Unknown"} />
      <Hero />
      <div
        className="px-8 py-24 xl:px-40"
        style={{
          minHeight: "calc(100vh - 224px)",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
