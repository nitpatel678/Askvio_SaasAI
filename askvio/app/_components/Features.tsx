"use client";

import { motion } from "framer-motion";
import { Brain, Users, Sparkles, Timer } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-white" />,
    title: "AI-Powered",
    description:
      "Generate smart, adaptive interview questions tailored to each role and candidate.",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Bias Reduction",
    description:
      "Ensure fairer hiring decisions with structured evaluations and unbiased scoring.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-white" />,
    title: "3D Avatars",
    description:
      "Engage candidates with lifelike avatars for immersive and interactive interviews.",
  },
  {
    icon: <Timer className="h-8 w-8 text-white" />,
    title: "Real-time Feedback",
    description:
      "Get instant scoring, analytics, and insights to make faster hiring decisions.",
  },
];

export default function Features() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-5xl">
        Powerful <span className="gradient-text">Features</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
        Everything you need to streamline hiring and improve candidate
        experience.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-lg hover:shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800">
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-neutral-400">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
