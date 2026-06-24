"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { Button } from "@heroui/react";

import { ArrowRight } from "@gravity-ui/icons";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const listings = [
  {
    id: 1,
    title: "Lakeview Loft",
    price: "$1,450/mo",
    location: "Portland, OR",
    accent: "from-violet-500/40 to-violet-500/5",
  },
  {
    id: 2,
    title: "Sunset Studio",
    price: "$980/mo",
    location: "Austin, TX",
    accent: "from-cyan-500/40 to-cyan-500/5",
  },
  {
    id: 3,
    title: "Harbor House",
    price: "$2,100/mo",
    location: "Seattle, WA",
    accent: "from-violet-400/40 to-cyan-400/10",
  },
];

const fields = [
  {
    key: "name",
    label: "Full Name",
    placeholder: "Jordan Avery",
    type: "text",
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
  {
    key: "image",
    label: "Photo URL",
    placeholder: "https://...",
    type: "text",
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
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
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

function FloatingListingCard({ listing, index, springX }) {
  const depth = (index + 1) * 16;
  const x = useTransform(springX, (v) => v * depth);

  return (
    <motion.div
      style={{ x }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: 0.4 + index * 0.15, duration: 0.5 },
        scale: { delay: 0.4 + index * 0.15, duration: 0.5 },
        y: {
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        },
      }}
      className={`mb-5 w-48 rounded-2xl border border-white/10 bg-linear-to-br ${listing.accent} p-4 backdrop-blur-md ${
        index % 2 === 1 ? "ml-9" : ""
      }`}
    >
      <p className="mb-1 text-xs text-slate-300">{listing.location}</p>
      <p className="text-sm font-semibold text-white">{listing.title}</p>
      <p className="text-sm text-cyan-300">{listing.price}</p>
    </motion.div>
  );
}

// "Sign here" style field — a dashed line that solidifies into a gradient
// stroke as it's filled in, echoing a lease document rather than a generic
// boxed input.
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
          autoComplete="off"
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

      <div className="relative h-0.5 w-full">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/15 transition-colors duration-300 group-focus-within:border-white/30" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-violet-500 to-cyan-400"
          initial={false}
          animate={{ width: filled ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [role, setRole] = useState("tenant");

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
  };

  const handleChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const filledCount = Object.values(values).filter(Boolean).length;
  const progress = (filledCount / fields.length) * 100;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, image, password } = values;

    try {
      setLoading(true);

      const { error } = await signUp.email({
        name,
        email,
        password,
        role,
        image,
        callbackURL: "/",
      });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
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
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      {/* Drifting gradient mesh */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* faint window-pane grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden flex-col justify-center overflow-hidden p-12 lg:flex"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
            >
              Join NestLoom
            </motion.span>

            <h1 className="text-5xl font-black leading-tight text-white">
              Find Your
              <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Dream Rental
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-400">
              Discover trusted rental properties, connect with verified owners,
              and secure your next home with confidence.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="text-2xl font-bold text-white">10K+</h3>
                <p className="text-slate-400">Happy Tenants</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="text-2xl font-bold text-white">5K+</h3>
                <p className="text-slate-400">Properties</p>
              </motion.div>
            </div>

            {/* Floating listing cards — mouse-reactive parallax */}
            <div className="pointer-events-none absolute -right-6 top-8 hidden xl:block">
              {listings.map((listing, i) => (
                <FloatingListingCard
                  key={listing.id}
                  listing={listing}
                  index={i}
                  springX={springX}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 lg:p-12"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="mt-2 text-slate-400">
                Start your rental journey today
              </p>
            </div>

            {/* Progress aura — fills as the form is completed */}
            <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <form onSubmit={handleSignUp} className="space-y-7">
              {fields.map((field, i) => (
                <motion.div
                  key={field.key}
                  custom={i}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <FormField
                    field={field}
                    index={i}
                    value={values[field.key]}
                    onChange={handleChange(field.key)}
                  />
                </motion.div>
              ))}

              <div className="flex text-white flex-col gap-4">
      <Label className="text-white">Subscription plan</Label>
      <RadioGroup onChange={value => setRole(value)} defaultValue="tenant" name="role"      orientation="horizontal">
        <Radio value="tenant">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label className="text-white">Tenant</Label>
          </Radio.Content>
        </Radio>
        <Radio value="owner">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
           <Label className="text-white">Owner</Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + fields.length * 0.08,
                  duration: 0.5,
                }}
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
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight />
                      </motion.span>
                    )
                  }
                  className="group relative overflow-hidden bg-linear-to-r from-violet-600 to-cyan-500 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  Create Account
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="my-5 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-wider text-slate-500">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
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
              transition={{ delay: 0.75, duration: 0.4 }}
              className="mt-6 text-center text-sm text-slate-400"
            >
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-cyan-400 hover:text-cyan-300"
              >
                Login
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
