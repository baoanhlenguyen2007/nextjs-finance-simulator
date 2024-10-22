"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ButtonNextDay from "@/app/(pages)/market/[stockId]/components/ButtonNextDay";
import ButtonResetGame from "./ButtonResetGame";

type Props = {
  isDarkMode: boolean;
  userDay: number | string;
};

const BoxCurrentDay = ({ isDarkMode, userDay }: Props) => {
  const [open, setOpen] = useState(false); // Add state for dropdown

  return (
    <div className="relative rounded-full">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "border rounded-xl px-4 py-1 cursor-pointer bg-white hover:opacity-85",
              isDarkMode
                ? "text-black border-white"
                : "border-primary text-primary"
            )}
          >
            Day {userDay}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg bg-white">
          <DropdownMenuLabel className="text-center text-sm font-bold">
            Simulation Day
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonNextDay />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonResetGame />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BoxCurrentDay;
