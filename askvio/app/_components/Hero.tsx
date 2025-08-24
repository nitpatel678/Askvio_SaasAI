"use client";

import { motion } from "framer-motion";
import Link from "next/dist/client/link";

export default function Hero() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      {/* Left vertical line with subtle moving white glow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-px overflow-hidden bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px animate-borderGlow bg-gradient-to-b from-transparent via-white/70 to-transparent dark:via-white/20" />
      </div>

      {/* Right vertical line with subtle moving white glow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-px overflow-hidden bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px animate-borderGlow bg-gradient-to-b from-transparent via-white/70 to-transparent dark:via-white/20" />
      </div>

      {/* Bottom horizontal line with subtle sweep */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full overflow-hidden bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute left-1/2 h-px w-40 -translate-x-1/2 animate-borderSweep bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20" />
      </div>

      <style jsx global>{`
        @keyframes borderGlow {
          0% { transform: translateY(-60%); opacity: 0.25; }
          50% { transform: translateY(40%); opacity: 0.7; }
          100% { transform: translateY(140%); opacity: 0.25; }
        }
        @keyframes borderSweep {
          0% { transform: translateX(-70%); opacity: 0.25; }
          50% { transform: translateX(-50%); opacity: 0.7; }
          100% { transform: translateX(70%); opacity: 0.25; }
        }
        .animate-borderGlow { animation: borderGlow 3.5s ease-in-out infinite; }
        .animate-borderSweep { animation: borderSweep 4.5s ease-in-out infinite; }
      `}</style>

      <div className="px-4 py-10 md:py-20">
        {/* Headline: Askvio */}
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-extrabold tracking-tight text-slate-800 md:text-5xl lg:text-7xl dark:text-slate-200">
          {"AI-powered interviews with lifelike 3D avatars and intelligent feedback"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.06,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-neutral-700 md:text-xl dark:text-neutral-300"
        >
          Askvio helps teams create, customize, and automate interviews with smart question flows and real-time scoring. Deliver a modern, engaging candidate experience while reducing bias and improving efficiency.
        </motion.p>

        {/* Centered primary CTA only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex items-center justify-center"
        >
          <Link href={'/dashboard'}>
            <button className="w-60 transform rounded-lg bg-white px-6 py-2 text-center font-medium text-black transition-all duration-300 hover:-translate-y-0.5 cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Explore Now
            </button>
          </Link>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.15 }}
          className="relative z-10 mt-16 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
        >
          <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <img
              src="/hero.png"
              alt="Askvio interview platform preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={720}
              width={1280}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}


