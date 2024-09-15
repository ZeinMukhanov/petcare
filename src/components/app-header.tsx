"use client";

import { usePathname } from "next/navigation";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function AppHeader() {
  const activePathname = usePathname();

  console.log(activePathname);
  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2 drop-shadow-md">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70  rounded-sm px-2 py-1 hover:text-white focus: text-white transition",
                  {
                    "bg-black/10 text-white/100": route.path === activePathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
