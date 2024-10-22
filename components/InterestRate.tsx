import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";

type Props = {
  value: number;
};

const InterestRate = ({ value }: Props) => {
  const color = value > 0 ? "#16A34A" : "#DC2626";
  const Icon = value > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <div
      className={cn(
        "flex h-full flex-row items-center text-base",
        value > 0 ? "text-green-600" : "text-red-600"
      )}
    >
      <Icon size={20} color={color} strokeWidth={2} />
      {value.toFixed(2)} %
    </div>
  );
};

export default InterestRate;
