"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    role: "Tenant",
    roleColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10 border border-cyan-400/20",
    icon: "🏠",
    name: "Explorer",
    desc: "Browse, book, and pay for rentals with full platform access.",
    price: null,
    priceLabel: "Free",
    priceNote: "No credit card required",
    ctaLabel: "Get Started Free",
    ctaClass:
      "w-full py-3 rounded-xl text-sm font-semibold border border-slate-700 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all",
    featuresTitle: "What's included",
    checkClass: "bg-cyan-400/10 border border-cyan-400/20 text-cyan-400",
    features: [
      "Browse all approved properties",
      "Search by location, type & price",
      "Book properties with move-in details",
      "Stripe-secured online payment",
      "Save favorites & revisit anytime",
      "Leave ratings and reviews",
      "Full booking history dashboard",
    ],
  },
  {
    role: "Property Owner",
    roleColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border border-violet-500/30",
    icon: "🏢",
    name: "Landlord Pro",
    desc: "List properties, manage bookings, and track your rental income.",
    monthlyPrice: 19,
    annualPrice: 15,
    priceNote: "Billed monthly · Cancel anytime",
    annualNote: "Billed $182/year · Save $46 annually",
    ctaLabel: "Start as Owner",
    ctaClass:
      "w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-violet-800 text-white border border-violet-500/40 shadow-[0_4px_24px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_32px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all",
    featuresTitle: "Everything in Explorer, plus",
    checkClass: "bg-violet-500/10 border border-violet-500/20 text-violet-400",
    featured: true,
    features: [
      "List unlimited properties",
      "Property analytics dashboard",
      "Monthly earnings chart (12 months)",
      "Booking approval / rejection control",
      "View tenant information & notes",
      "See admin rejection feedback",
      "Priority listing visibility",
    ],
  },
  {
    role: "Admin",
    roleColor: "text-red-400",
    iconBg: "bg-red-400/10 border border-red-400/20",
    icon: "🛡️",
    name: "Command",
    desc: "Full platform oversight — moderate listings, manage users, and monitor all activity.",
    price: null,
    priceLabel: "By Invite",
    priceNote: "Admin roles are assigned internally",
    ctaLabel: "Contact Platform Team",
    ctaClass:
      "w-full py-3 rounded-xl text-sm font-semibold border border-red-400/20 text-red-400 hover:bg-red-400/5 transition-all",
    featuresTitle: "Full platform access",
    checkClass: "bg-red-400/10 border border-red-400/20 text-red-400",
    features: [
      "Manage all users & change roles",
      "Approve or reject property listings",
      "Send rejection feedback to owners",
      "Monitor all bookings platform-wide",
      "View all transaction records",
      "Full audit trail & activity log",
      "Platform-level moderation controls",
    ],
  },
];

const compareRows = [
  { feature: "Browse properties", tenant: true, owner: true, admin: true },
  { feature: "Book & pay online", tenant: true, owner: false, admin: false },
  { feature: "Save favorites", tenant: true, owner: false, admin: false },
  { feature: "Write reviews", tenant: true, owner: false, admin: false },
  { feature: "List properties", tenant: false, owner: true, admin: false },
  { feature: "Earnings analytics", tenant: false, owner: true, admin: false },
  {
    feature: "Approve / reject bookings",
    tenant: false,
    owner: true,
    admin: false,
  },
  { feature: "Manage all users", tenant: false, owner: false, admin: true },
  { feature: "Moderate listings", tenant: false, owner: false, admin: true },
  {
    feature: "View all transactions",
    tenant: false,
    owner: false,
    admin: true,
  },
];

const faqs = [
  {
    q: "Can I switch from Tenant to Owner?",
    a: "Yes. You can register as a Tenant first and upgrade to Owner later from your profile settings. Your existing bookings are preserved.",
  },
  {
    q: "Is the Tenant plan really free forever?",
    a: "Absolutely. There's no time limit or usage cap for Tenants. Browse, book, and pay without any subscription cost.",
  },
  {
    q: "How does Google Sign-In affect my role?",
    a: "Social login via Google automatically assigns you the Tenant role. You can update your role to Owner from your dashboard after signup.",
  },
  {
    q: "Why was my property listing rejected?",
    a: "Admins review all listings before approval. If rejected, you'll see the specific feedback by clicking the 👁️ button next to the listing status.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Violet glow */}
      <div
        className="pointer-events-none fixed z-0"
        style={{
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-violet-400">
              Transparent Pricing
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{
              background:
                "linear-gradient(135deg, #f8fafc 0%, #a78bfa 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Simple Plans for Every Role
          </h1>
          <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
            Whether you are a tenant searching for your next home or an owner
            managing properties — NestLoom has the right plan for you.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`text-sm font-medium ${!isAnnual ? "text-slate-200" : "text-slate-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual((p) => !p)}
            className="relative w-13 h-7 rounded-full border border-violet-500/40 bg-violet-500/20 transition-all"
            style={{ width: 52, height: 28 }}
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-violet-500 transition-transform duration-300"
              style={{ transform: isAnnual ? "translateX(24px)" : "none" }}
            />
          </button>
          <span
            className={`text-sm font-medium ${isAnnual ? "text-slate-200" : "text-slate-500"}`}
          >
            Annual
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 transition-opacity ${isAnnual ? "opacity-100" : "opacity-40"}`}
          >
            Save 20%
          </span>
        </div>

        {/* Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative rounded-2xl p-8 backdrop-blur-xl overflow-hidden transition-transform hover:-translate-y-1 ${
                plan.featured
                  ? "border border-violet-500/50 bg-violet-500/5"
                  : "border border-slate-800 bg-slate-900/80"
              }`}
            >
              {plan.featured && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)",
                    }}
                  />
                  <span className="absolute top-5 right-5 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white bg-gradient-to-r from-violet-600 to-cyan-500">
                    Most Popular
                  </span>
                </>
              )}

              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 ${plan.iconBg}`}
              >
                {plan.icon}
              </div>

              <p
                className={`text-xs font-bold tracking-widest uppercase mb-1.5 ${plan.roleColor}`}
              >
                {plan.role}
              </p>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-7">
                {plan.desc}
              </p>

              {/* Price */}
              {plan.priceLabel ? (
                <>
                  <p
                    className={`font-extrabold mb-1 ${plan.priceLabel === "Free" ? "text-4xl text-slate-100" : "text-2xl text-slate-400"}`}
                  >
                    {plan.priceLabel}
                  </p>
                  <p className="text-xs text-slate-500 mb-7">
                    {plan.priceNote}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-lg font-semibold text-slate-400">
                      $
                    </span>
                    <span className="text-4xl font-extrabold text-slate-100 tracking-tight">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-slate-500">/ month</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-7">
                    {isAnnual ? plan.annualNote : plan.priceNote}
                  </p>
                </>
              )}

              <hr className="border-slate-800 mb-6" />

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                {plan.featuresTitle}
              </p>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-slate-400 text-sm"
                  >
                    <span
                      className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${plan.checkClass}`}
                      style={{ width: 18, height: 18 }}
                    >
                      ✓
                    </span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <form action={"/api/subscription"} method="POST">
                <button type="submit" className={plan.ctaClass}>
                  {plan.ctaLabel}
                </button>
              </form>
            </motion.div>
          ))}
        </motion.div>

        {/* Compare Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-xl font-bold text-slate-200 mb-2">
            Full Feature Comparison
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            See exactly what each role gets access to on NestLoom.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-widest text-slate-600 border-b border-slate-800">
                    Feature
                  </th>
                  <th className="py-3 px-5 text-xs font-bold uppercase tracking-widest text-slate-600 border-b border-slate-800">
                    Tenant
                  </th>
                  <th className="py-3 px-5 text-xs font-bold uppercase tracking-widest text-violet-400 border-b border-slate-800">
                    Owner
                  </th>
                  <th className="py-3 px-5 text-xs font-bold uppercase tracking-widest text-slate-600 border-b border-slate-800">
                    Admin
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-violet-500/[0.03] transition-colors"
                  >
                    <td className="py-3.5 px-5 text-sm text-slate-300 border-b border-slate-800/60">
                      {row.feature}
                    </td>
                    {["tenant", "owner", "admin"].map((k) => (
                      <td
                        key={k}
                        className="py-3.5 px-5 text-center border-b border-slate-800/60"
                      >
                        {row[k] ? (
                          <span className="text-cyan-400 text-base">✓</span>
                        ) : (
                          <span className="text-slate-700 text-sm">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-xl font-bold text-slate-200 mb-8 text-center">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6"
              >
                <p className="text-sm font-semibold text-slate-200 mb-2">
                  {faq.q}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-violet-500/20 bg-violet-500/5 p-14 text-center overflow-hidden"
        >
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48"
            style={{
              background:
                "radial-gradient(ellipse, rgba(139,92,246,0.2), transparent 70%)",
            }}
          />
          <h2 className="relative text-2xl font-extrabold text-slate-100 mb-2">
            Ready to find your next home?
          </h2>
          <p className="relative text-slate-500 text-sm mb-7">
            Join thousands of tenants and owners on NestLooms transparent
            rental marketplace.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-7 py-3 rounded-xl bg-slate-100 text-slate-900 text-sm font-bold hover:bg-white transition-colors">
              Start for Free
            </button>
            <button className="px-7 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/18 transition-colors">
              Browse Properties
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
