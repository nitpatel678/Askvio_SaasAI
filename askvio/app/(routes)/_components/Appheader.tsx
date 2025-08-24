import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function AppHeader() {
  const MenuOption = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upgrade", path: "/upgrade" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  return (
    <nav className="flex w-full items-center px-6 py-4">
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        <img
          src="./logo.png"
          alt="Askvio"
          className="h-7 w-auto md:h-9"
        />
      </div>

      {/* Center: Menu */}
      <div className="flex-1 flex justify-center">
        <ul className="flex gap-6 text-lg font-medium">
          {MenuOption.map((item) => (
            <li
              className="hover:scale-105 transition-all"
              key={item.name}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: UserButton with padding */}
      <div className="flex items-center pl-4">
        <UserButton />
      </div>
    </nav>
  );
}

export default AppHeader;
