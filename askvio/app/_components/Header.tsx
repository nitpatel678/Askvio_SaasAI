import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="flex w-full items-center justify-between px-4 py-4 mt-1 ml-3 mr-3">
      <div className="flex items-center gap-3">
        {/* Logo Image */}
        <img
          src="./logo.png" // change to your logo path e.g., "/logo.svg"
          alt="Askvio"
          className="ml-2 h-7 w-auto md:h-9"
        />
      </div>
      <Link href={'/dashboard'}>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      </Link>
    </nav>
  );
}
export default Header;
