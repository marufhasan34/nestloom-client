"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";

import { ArrowRight } from "@gravity-ui/icons";

import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote: "Found a place two blocks from my old apartment within a week. The whole process felt effortless.",
    name: "Sara K.",
    role: "Tenant in Austin",
  },
  {
    quote: "Verified owners made me trust the listings instantly. No more guessing games with sketchy posts.",
    name: "Daniyal R.",
    role: "Tenant in Seattle",
  },
  {
    quote: "Booked a viewing, signed the lease, moved in — all inside a single week. Genuinely smooth.",
    name: "Priya M.",
    role: "Tenant in Portland",
  },
];

const fields = [
  {
    key: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
  {
    key: "password",
    label: "Password",
    placeholder: "••••••••",
    type: "password",
  },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function EyeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.4 18.4 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

// Same "sign here" field treatment as the signup page — dashed line that
// solidifies into a gradient stroke once filled in. Password fields get a
// show/hide eye toggle.
function FormField({ field, index, value, onChange }) {
  const filled = Boolean(value);
  const isPassword = field.type === "password";
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : field.type;

  return (
    <div className="group relative">
      <div className="mb-1 flex items-baseline justify-between">
        <label
          htmlFor={field.key}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-300"
        >
          {field.label}
        </label>
        <span className="font-mono text-[10px] text-slate-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex items-center">
        <input
          id={field.key}
          name={field.key}
          type={inputType}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          autoComplete={field.type === "password" ? "current-password" : "email"}
          className={`w-full bg-transparent px-1.5 py-1.5 text-base text-white outline-none placeholder:text-slate-600 ${
            isPassword ? "pr-9" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:text-cyan-300"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      <div className="relative h-[2px] w-full">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/15 transition-colors duration-300 group-focus-within:border-white/30" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500"
          initial={false}
          animate={{ width: filled ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// Ambient, auto-advancing quote card — the calmer counterpart to the
// mouse-driven listing cards on the signup page.
function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[active];

  return (
    <div className="relative mt-10 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <span aria-hidden className="absolute -top-4 left-6 font-serif text-5xl text-cyan-400/30">
        “
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base text-slate-200">{current.quote}</p>
          <p className="mt-4 text-sm font-semibold text-white">{current.name}</p>
          <p className="text-xs text-slate-500">{current.role}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex gap-1.5">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-gradient-to-r from-cyan-400 to-violet-500" : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      setLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        alert(error.message || "Login Failed");
        return;
      }

      console.log(data);

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Drifting gradient mesh — mirrored corners from the signup page */}
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />

      {/* faint dot grid — a quieter texture than the signup page's line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-2">
          {/* Left Side — form (mirrored from the signup layout) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 p-8 lg:order-1 lg:p-12"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white">Sign In</h2>
              <p className="mt-2 text-slate-400">Glad to have you back</p>
            </div>

            {/* Segmented progress — one stroke per field instead of a single bar */}
            <div className="mb-7 flex gap-2">
              {fields.map((field) => {
                const filled = Boolean(values[field.key]);
                return (
                  <div key={field.key} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      animate={{ width: filled ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSignIn} className="space-y-7">
              {fields.map((field, i) => (
                <motion.div key={field.key} custom={i} variants={fieldVariants} initial="hidden" animate="visible">
                  <FormField field={field} index={i} value={values[field.key]} onChange={handleChange(field.key)} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + fields.length * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={loading}
                  endContent={
                    !loading && (
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight />
                      </motion.span>
                    )
                  }
                  className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  Sign In
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="my-5 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-wider text-slate-500">or</span>
              <span className="h-px flex-1 bg-white/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <Button
                onPress={handleGoogleLogin}
                variant="bordered"
                size="lg"
                fullWidth
                className="border-white/20 text-white"
              >
                Continue With Google
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="mt-6 text-center text-sm text-slate-400"
            >
              New to NestLoom?{" "}
              <Link href="/auth/signup" className="font-medium text-cyan-400 hover:text-cyan-300">
                Create an account
              </Link>
            </motion.p>
          </motion.div>

          {/* Right Side — testimonial carousel instead of the signup page's listing cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 hidden flex-col justify-center p-12 lg:order-2 lg:flex"
          >
            <span className="mb-4 w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Welcome Back
            </span>

            <h1 className="text-5xl font-black leading-tight text-white">
              Pick Up Where
              <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                You Left Off
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-400">
              Your saved listings, conversations, and applications are exactly where you left
              them.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-2xl font-bold text-white">98%</h3>
                <p className="text-slate-400">Match Rate</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-2xl font-bold text-white">24h</h3>
                <p className="text-slate-400">Avg. Response</p>
              </motion.div>
            </div>

            <TestimonialCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}