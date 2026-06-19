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
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            Why Choose NestLoom
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">
            Built Around Trust,
            <span className="block text-violet-600">
              Designed For Comfort
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            NestLoom makes renting simple, secure and transparent
            for both tenants and property owners.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 lg:block" />

          <div className="space-y-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    x: isEven ? -80 : 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                  }}
                  className={`relative flex items-center ${
                    isEven
                      ? "lg:justify-start"
                      : "lg:justify-end"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-violet-600 shadow-lg lg:block" />

                  {/* Card */}
                  <div className="w-full lg:w-[45%]">
                    <div className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-violet-600">
                            Feature 0{index + 1}
                          </p>

                          <h3 className="text-xl font-bold text-slate-900">
                            {feature.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {[
            ["12K+", "Properties Listed"],
            ["5K+", "Happy Tenants"],
            ["2K+", "Verified Owners"],
            ["98%", "Client Satisfaction"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl bg-white p-6 text-center shadow-sm"
            >
              <h3 className="text-3xl font-black text-violet-600">
                {number}
              </h3>

              <p className="mt-2 text-slate-600">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}