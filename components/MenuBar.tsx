import React, { useState } from "react";
import { MenuSquare } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface Props {
  isDarkMode: boolean;
}
const MenuBar = ({ isDarkMode }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // Add state for dropdown

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/market`,
      label: "Market",
      active: pathname === `/market`,
    },
    {
      href: `/news`,
      label: "News",
      active: pathname === `/news`,
    },
    {
      href: `/about`,
      label: "About",
      active: pathname === `/about`,
    },
  ];
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <MenuSquare color={isDarkMode ? "white" : "black"} size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Finance Simulator</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {routes.map((route) => (
            <DropdownMenuItem key={route.href}>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-base transition-colors hover:text-primary text-dark-2",
                  route.active && "text-primary"
                )}
                onClick={() => setOpen(false)} // Close dropdown on click
              >
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <SignedOut>
            <DropdownMenuSeparator />
            <Link href="/sign-in">
              <Button className="px-6 text-base font-medium text-white">
                Sign in
              </Button>
            </Link>
          </SignedOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuBar;
