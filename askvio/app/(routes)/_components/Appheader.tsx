"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AppHeader() {
  const MenuOption = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upgrade", path: "/upgrade" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 bg-black text-white relative z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Askvio" className="h-7 w-auto md:h-9" />
      </div>

      {/* Center: Menu - hidden on mobile */}
      <ul className="hidden md:flex gap-6 text-lg font-medium">
        {MenuOption.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.05 }}
            className="transition-all"
          >
            <Link href={item.path}>{item.name}</Link>
          </motion.li>
        ))}
      </ul>

      {/* Right: UserButton & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <UserButton />
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[4px] w-6 h-6"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-black flex flex-col items-center gap-4 py-4 text-lg font-medium shadow-lg"
          >
            {MenuOption.map((item) => (
              <li key={item.name} onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default AppHeader;
