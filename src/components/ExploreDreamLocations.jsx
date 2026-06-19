"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { House } from "@gravity-ui/icons";

const locations = [
  {
    name: "Cox's Bazar",
    properties: "1,250+",
    label: "Properties",
    image:
      "https://images.unsplash.com/photo-1609501285437-4eb001f82684?w=800&auto=format&fit=crop&q=80",
    featured: true,
    tag: "Most Popular",
  },
  {
    name: "Dhaka",
    properties: "3,500+",
    label: "Properties",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Chattogram",
    properties: "1,800+",
    label: "Properties",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Sylhet",
    properties: "950+",
    label: "Properties",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Rajshahi",
    properties: "720+",
    label: "Properties",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
  },
];

export default function ExploreDreamLocations() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      <div className="pointer-events-none absolute -left-72 top-0 h-[700px] w-[700px] rounded-full bg-violet-700/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-72 bottom-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/10 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Explore Dream Locations
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight text-white lg:text-5xl">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Home In Bangladesh
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-base text-slate-400">
            Explore top rental destinations — from coastal gems to bustling
            city centres — and find where you belong.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-[28px] lg:col-span-7 lg:row-span-2"
            style={{
              boxShadow:
                "0 0 0 1px rgba(139,92,246,0.2), 0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div className="relative h-[420px] w-full lg:h-full lg:min-h-[520px]">
              <Image
                src={locations[0].image}
                alt={locations[0].name}
                fill
                className="object-cover transition duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 to-transparent" />

              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-violet-600/10 blur-2xl" />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/80 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {locations[0].tag}
                </span>
              </div>

              <div className="pointer-events-none absolute right-4 top-2 select-none bg-gradient-to-b from-white/8 to-transparent bg-clip-text text-[160px] font-black leading-none text-transparent">
                01
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 backdrop-blur-md">
                  <House className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs text-white/80">
                    {locations[0].properties} {locations[0].label}
                  </span>
                </div>

                <h3 className="text-5xl font-black text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  {locations[0].name}
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Bangladeshs longest sea beach destination
                </p>

                <button className="group/btn mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] active:scale-95">
                  Browse Properties
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {locations.slice(1).map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl lg:col-span-5"
            >
              <div className="relative h-[166px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/55" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-violet-500 to-cyan-500 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="pointer-events-none absolute right-3 top-0 select-none text-[80px] font-black leading-none text-white/[0.04]">
                  0{index + 2}
                </div>

                <div className="absolute inset-0 flex items-end justify-between p-5">
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow">
                      {location.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/50">
                      {location.properties} {location.label}
                    </p>
                  </div>

                  <div className="flex h-8 w-8 translate-x-4 items-center justify-center rounded-full border border-white/10 bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </section>
  );
}