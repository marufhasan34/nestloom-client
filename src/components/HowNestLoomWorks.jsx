"use client";

import { motion } from "framer-motion";
import {
  House,
  Bookmark,
  ArrowRight,
  CirclePlus,
} from "@gravity-ui/icons";

const steps = [
  {
    title: "Discover",
    description:
      "Browse verified rental properties across Bangladesh.",
    icon: House,
  },
  {
    title: "Shortlist",
    description:
      "Save your favorite properties and compare options.",
    icon: Bookmark,
  },
  {
    title: "Book Securely",
    description:
      "Submit booking requests and confirm reservations.",
    icon: CirclePlus,
  },
  {
    title: "Move In",
    description:
      "Complete payment and move into your new home.",
    icon: ArrowRight,
  },
];

export default function HowNestLoomWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            Rental Journey
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            How
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              NestLoom Works
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            From discovering properties to moving into your
            dream home, every step is simple and secure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
            className="absolute left-0 top-10 hidden h-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500 lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="group relative"
                >
                  {/* Dot */}
                  <div className="mx-auto mb-8 hidden h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-slate-900 lg:flex">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    {/* Hover Glow */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Step Number */}
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 font-bold text-violet-300">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}