"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="./avtar.png"
            alt="About Askvio"
            className="rounded-2xl border border-neutral-800 shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold md:text-5xl">
            About <span className="gradient-text">Askvio</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            We built Askvio to revolutionize the interview process. Traditional
            hiring is slow, biased, and inefficient. Our platform uses AI,
            automation, and immersive 3D avatars to create a modern, fair, and
            engaging candidate experience.
          </p>
          <p className="mt-3 text-neutral-400">
            Companies of all sizes use Askvio to save time, reduce costs, and
            make smarter hiring decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
