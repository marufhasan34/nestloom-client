"use client";

import { motion } from "framer-motion";
import { Star } from "@gravity-ui/icons";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Tenant",
    rating: 5,
    review:
      "NestLoom made finding my apartment incredibly easy. The booking process was smooth and transparent.",
  },
  {
    name: "Rahim Uddin",
    role: "Tenant",
    rating: 5,
    review:
      "Verified listings gave me confidence. I found exactly what I was looking for within a few days.",
  },
  {
    name: "Nusrat Jahan",
    role: "Tenant",
    rating: 5,
    review:
      "The payment and booking experience felt secure. One of the best rental platforms I have used.",
  },
  {
    name: "Tanvir Hasan",
    role: "Tenant",
    rating: 5,
    review:
      "The owner communication system is excellent. Everything was straightforward and professional.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            Customer Reviews
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            What Our
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Tenants Say
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Real stories from people who found their perfect home
            through NestLoom.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{
                opacity: 0,
                y: 80,
                rotate: -2,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                group
                relative
                flex
                h-full
                flex-col
                justify-between
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-violet-500/30
                hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
              "
            >
              {/* Animated Top Glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="mb-8 flex-grow leading-relaxed text-slate-300">
                {review.review}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 font-bold text-white">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    {review.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}