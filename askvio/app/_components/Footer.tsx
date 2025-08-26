import Link from "next/link";
import { Github, Linkedin , } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Askvio" className="h-8 w-auto" />
        </div>
        <nav className="flex gap-6 text-sm text-neutral-400">
          <Github href="github.com/nitpatel678"></Github>
          <Linkedin href="https://www.linkedin.com/in/nitinpatelftp/"></Linkedin>
          
        </nav>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Askvio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
