"use client";

import { useRef } from "react";
import { Input, Select, ListBox } from "@heroui/react";
import { House, ArrowRight, MagnifierPlus } from "@gravity-ui/icons";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const stats = [
  { value: "12K+", label: "Listings" },
  { value: "5K+", label: "Tenants" },
  { value: "98%", label: "Satisfaction" },
];

const tags = ["Apartment in Dhaka", "Villa in Cox's Bazar", "Studio in Chittagong"];

const gradients = [
  "from-violet-400 to-violet-600",
  "from-cyan-400 to-cyan-600",
  "from-fuchsia-400 to-fuchsia-600",
  "from-sky-400 to-sky-600",
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const glowX = useTransform(x, [-1, 1], [0, 100]);
  const glowY = useTransform(y, [-1, 1], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(200px circle at ${gx}% ${gy}%, rgba(139,92,246,0.12), transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Banner() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const blob1X = useSpring(useTransform(mouseX, [0, 1], [-60, 60]), { stiffness: 30, damping: 20 });
  const blob1Y = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), { stiffness: 30, damping: 20 });
  const blob2X = useSpring(useTransform(mouseX, [0, 1], [60, -60]), { stiffness: 30, damping: 20 });
  const blob2Y = useSpring(useTransform(mouseY, [0, 1], [40, -40]), { stiffness: 30, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="pointer-events-none absolute -left-72 -top-32 h-[800px] w-[800px] rounded-full bg-violet-700/15 blur-[180px]"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="pointer-events-none absolute -right-72 top-32 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]"
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-fuchsia-900/10 blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="h-[900px] w-[900px] rounded-full border border-violet-500/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5"
        />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-violet-500 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div className="relative">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              Trusted Rental Marketplace
            </motion.div>

            <div className="mt-8 overflow-hidden">
              {[
                { text: "Find Your", gradient: false, delay: 0.2 },
                { text: "Perfect Rental", gradient: true, delay: 0.35 },
                { text: "Home Today", gradient: false, delay: 0.5 },
              ].map((line) => (
                <div key={line.text} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                    className={`block text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl ${
                      line.gradient
                        ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400"
            >
              Explore verified rental properties, connect directly with trusted
              owners, and enjoy secure online booking with seamless payment
              experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.95 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex cursor-default items-center gap-3"
                >
                  <div>
                    <div className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-2xl font-black text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                  {i < stats.length - 1 && <div className="h-8 w-px bg-white/10" />}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {gradients.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 1.15 + i * 0.08, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`relative h-9 w-9 rounded-full border-2 border-slate-950 bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="text-sm text-slate-400"
              >
                Joined by{" "}
                <span className="font-semibold text-white">5,000+ tenants</span>{" "}
                this month
              </motion.p>
            </motion.div>

            <div className="mt-10 space-y-3">
              {[
                { icon: "🏠", title: "New Listing Added", sub: "Gulshan-2, Dhaka · Just now", color: "violet", delay: 1.5 },
                { icon: "✅", title: "Booking Confirmed", sub: "Sea View Villa, Cox's Bazar", color: "emerald", delay: 1.65 },
                { icon: "⭐", title: "5-Star Review", sub: "Tenant · Sylhet Hills", color: "amber", delay: 1.8 },
              ].map((toast, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: toast.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    whileHover={{ scale: 1.04, x: 6 }}
                    className="group inline-flex cursor-default items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-violet-500/30 hover:bg-white/[0.07]"
                  >
                    <span className="text-xl">{toast.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">{toast.title}</p>
                      <p className="text-[10px] text-slate-500">{toast.sub}</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`h-2 w-2 rounded-full ${
                        toast.color === "emerald"
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          : toast.color === "amber"
                          ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                          : "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 80, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TiltCard className="group relative rounded-3xl">
              <motion.div
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.01, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-violet-500/30 via-transparent to-cyan-500/30 blur-sm"
              />

              <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.5, 0] }}
                  transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />

                <div className="mb-8 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 0 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <House className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Search Properties</h2>
                    <p className="text-xs text-slate-400">Find your perfect match</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Location", delay: 0.7, node: (
                      <Input
                        placeholder="Dhaka, Chattogram..."
                        className={{
                          inputWrapper: "bg-white/5 border border-white/10 hover:border-violet-500/60 focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] rounded-xl transition-all duration-300",
                          input: "text-white placeholder:text-slate-500",
                        }}
                      />
                    )},
                    { label: "Property Type", delay: 0.8, node: (
                      <Select
                        placeholder="Select Property Type"
                        className={{
                          trigger: "bg-white/5 border border-white/10 hover:border-violet-500/60 rounded-xl text-slate-300 transition-all duration-300",
                        }}
                      >
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="apartment" textValue="Apartment">Apartment<ListBox.ItemIndicator /></ListBox.Item>
                            <ListBox.Item id="villa" textValue="Villa">Villa<ListBox.ItemIndicator /></ListBox.Item>
                            <ListBox.Item id="house" textValue="House">House<ListBox.ItemIndicator /></ListBox.Item>
                            <ListBox.Item id="studio" textValue="Studio">Studio<ListBox.ItemIndicator /></ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )},
                  ].map((field) => (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: field.delay, duration: 0.5 }}
                    >
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">{field.label}</label>
                      {field.node}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {[
                      { label: "Min Price", placeholder: "৳ 5,000" },
                      { label: "Max Price", placeholder: "৳ 50,000" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">{f.label}</label>
                        <Input
                          type="number"
                          placeholder={f.placeholder}
                          className={{
                            inputWrapper: "bg-white/5 border border-white/10 hover:border-violet-500/60 focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] rounded-xl transition-all duration-300",
                            input: "text-white placeholder:text-slate-500",
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative mt-2 flex w-full overflow-hidden items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(139,92,246,0.4)] transition-shadow duration-300 hover:shadow-[0_4px_40px_rgba(139,92,246,0.65)]"
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-0 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      <MagnifierPlus className="h-4 w-4" />
                      Search Properties
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15 }}
                    className="pt-2"
                  >
                    <p className="mb-3 text-xs text-slate-500">Popular searches</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <motion.button
                          key={tag}
                          initial={{ opacity: 0, scale: 0.85, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 1.2 + i * 0.08, type: "spring", stiffness: 250 }}
                          whileHover={{ scale: 1.06, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-colors duration-200 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}