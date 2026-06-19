"use client";

import { motion } from "framer-motion";
import {
  House,
  Factory,
  Bookmark,
  Star,
} from "@gravity-ui/icons";

const features = [
  {
    title: "Verified Properties",
    description:
      "Every property is manually reviewed before appearing on NestLoom, ensuring quality and trust.",
    icon: House,
  },
  {
    title: "Trusted Property Owners",
    description:
      "Connect directly with verified owners and avoid unnecessary middlemen.",
    icon: Factory,
  },
  {
    title: "Secure Booking Process",
    description:
      "From booking requests to online payments, everything is protected and transparent.",
    icon: Bookmark,
  },
  {
    title: "Top Rated Experience",
    description:
      "Ratings, reviews, and real tenant feedback help you make better decisions.",
    icon: Star,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -left-60 top-10 h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-60 bottom-10 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Why Choose NestLoom
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            Built Around Trust,
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Designed For Comfort
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            NestLoom makes renting simple, secure and transparent
            for both tenants and property owners.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/60 via-cyan-500/60 to-transparent lg:block" />

          <div className="space-y-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center ${
                    isEven ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                    <div className="h-5 w-5 rounded-full border-2 border-violet-400 bg-slate-950 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  </div>

                  <div className="w-full lg:w-[45%]">
                    <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/30 hover:bg-white/[0.07]">
                      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                        style={{
                          background: isEven
                            ? "radial-gradient(circle at 0% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)"
                            : "radial-gradient(circle at 100% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)",
                        }}
                      />

                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(139,92,246,0.3)]">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                            Feature 0{index + 1}
                          </p>
                          <h3 className="text-xl font-bold text-white">
                            {feature.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 leading-relaxed text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            ["12K+", "Properties Listed"],
            ["5K+", "Happy Tenants"],
            ["2K+", "Verified Owners"],
            ["98%", "Client Satisfaction"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/5 bg-white/[0.04] p-6 text-center backdrop-blur-sm"
            >
              <h3 className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-3xl font-black text-transparent">
                {number}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}