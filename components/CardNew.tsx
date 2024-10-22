/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { IPost } from "@/app/actions/posts";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Props = {
  post: IPost;
  userDay: number;
};

const CardNew = ({ post, userDay }: Props) => {
  const lock = post.simulationDay > userDay;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (lock) {
      e.preventDefault();
      toast.error("You cannot access this post. Please come back later");
    }
  };
  return (
    <Link href={`/news/${post.id}`} onClick={handleClick}>
      <div className="relative rounded-2xl bg-white shadow-app">
        {lock && (
          <div className="absolute inset-0 z-20 rounded-2xl bg-gray-50 opacity-50" />
        )}

        <div className="relative h-48 w-full ">
          <img
            src={post.imageUrl}
            alt="image"
            className="size-full rounded-t-2xl object-cover"
          />
          {/* label lock  */}
          <div
            className={cn(
              "absolute bottom-4 left-4 rounded-xl px-2.5 py-0.5 text-sm text-white z-10",
              lock ? "bg-red-600" : "bg-green-600"
            )}
          >
            {lock ? "Lock" : "Unlock"}
          </div>
          {/* label day */}
          <div
            className={cn(
              "absolute rounded-br-2xl top-0 left-0 px-2.5 py-0.5 bg-gray-50 text-sm text-black z-10"
            )}
          >
            {lock ? "Day ?" : `Day ${post.simulationDay}`}
          </div>
        </div>
        <div className="space-y-2.5 p-6">
          <div className="flex flex-row items-center gap-3">
            <img
              src={post.stock.symbol}
              alt="logo"
              className="size-8 rounded-full"
            />
            <p className="rounded-sm bg-gray-100 px-4 text-xs ">
              {post.stock.shortName}
            </p>
          </div>
          <h1 className="line-clamp-1 text-base font-semibold text-gray-800">
            {post.title}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardNew;
