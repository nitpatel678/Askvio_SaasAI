"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does Askvio work?",
    a: "Askvio uses AI and 3D avatars to conduct immersive interviews, generate smart questions, and provide instant scoring.",
  },
  {
    q: "Can I customize interview flows?",
    a: "Yes! You can fully customize question sets, avatar interactions, and evaluation criteria.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use enterprise-grade encryption and comply with global security standards.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-5xl">
        Frequently Asked <span className="gradient-text">Questions</span>
      </h2>

      <div className="mt-10 space-y-4">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.15 }}
            className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-medium text-white">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 text-neutral-400 transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <p className="mt-3 text-neutral-400">{item.a}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
