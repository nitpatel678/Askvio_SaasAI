"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Manager at TechCorp",
    text: "Askvio completely transformed how we interview candidates. Faster, fairer, and candidates love it.",
  },
  {
    name: "Amit Verma",
    role: "Talent Lead at StartHub",
    text: "The real-time scoring and AI-driven feedback helped us cut hiring time in half.",
  },
  {
    name: "Emily Carter",
    role: "Recruiter at GlobalHire",
    text: "Candidates told us this was the most engaging interview experience they ever had.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-5xl">
        What Our <span className="gradient-text">Clients Say</span>
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-lg"
          >
            <p className="text-neutral-300">“{t.text}”</p>
            <div className="mt-4">
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-neutral-400">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
