"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import React from "react";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex w-full items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Askvio"
          className="h-7 w-auto md:h-9"
        />
      </div>

      {/* Right side: Either Login button or UserButton */}
      <div className="flex items-center">
        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9", // match your design
              },
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="w-24 md:w-32 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}

export default Header;
