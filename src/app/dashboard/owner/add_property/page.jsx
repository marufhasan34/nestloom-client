"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Form,
  Fieldset,
  FieldError,
  TextField,
  TextArea,
  Select,
  Label,
  Input,
  ListBox,
  Button,
  toast,
} from "@heroui/react";
import { createProperty } from "@/lib/actions/property";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const inputCls = `
  w-full rounded-xl border border-dashed border-slate-700/80
  bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-100
  placeholder:text-slate-600 outline-none ring-0
  transition-all duration-200
  focus:border-violet-500/60 focus:bg-slate-900/90 focus:ring-2 focus:ring-violet-500/15
  data-[invalid=true]:border-red-500/60
`;

function Field({ label, name, placeholder, type = "text", isRequired }) {
  return (
    <TextField
      name={name}
      type={type}
      isRequired={isRequired}
      className="flex flex-col gap-1"
    >
      <Label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
        {isRequired && <span className="ml-1 text-violet-400">*</span>}
      </Label>
      <Input placeholder={placeholder} className={inputCls} />
      <FieldError className="text-[11px] text-red-400" />
    </TextField>
  );
}

function Sel({ label, name, placeholder, isRequired, items, accent = "violet" }) {
  return (
    <Select name={name} isRequired={isRequired} className="flex flex-col gap-1">
      <Label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
        {isRequired && <span className="ml-1 text-violet-400">*</span>}
      </Label>
      <Select.Trigger className={inputCls + " flex items-center justify-between"}>
        <Select.Value className="data-[placeholder=true]:text-slate-600" />
        <Select.Indicator className="text-slate-500" />
      </Select.Trigger>
      <Select.Popover className="rounded-xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/60 z-50">
        <ListBox className="p-1">
          {items.map((t) => (
            <ListBox.Item
              key={t}
              id={t}
              textValue={t}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors
                hover:bg-${accent}-500/10 hover:text-${accent}-300
                data-[selected=true]:bg-${accent}-500/20 data-[selected=true]:text-${accent}-200`}
            >
              {t}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError className="text-[11px] text-red-400" />
    </Select>
  );
}

function Section({ title, children }) {
  return (
    <motion.div variants={fadeUp}>
      <Fieldset className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 backdrop-blur-sm">
        <Fieldset.Legend className="mb-4 text-sm font-semibold text-slate-300 tracking-wide">
          {title}
        </Fieldset.Legend>
        <Fieldset.Group className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {children}
        </Fieldset.Group>
      </Fieldset>
    </motion.div>
  );
}

const AMENITIES = [
  "WiFi", "Parking", "Air Conditioning", "Heating", "Washer",
  "Dryer", "Kitchen", "TV", "Gym", "Pool", "Elevator",
  "Security", "Balcony", "Garden",
];

export default function AddProperty() {
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const toggleAmenity = (a) =>
    setAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      data.amenities = amenities;
      data.status = "pending";
      data.myPropertyId = "property_123";

      const res = await createProperty(data);

      if (res.insertedId) {
        toast.success("Property posted successfully");
        e.target.reset();
        setAmenities([]);
        setImages([]);
        router.push("/dashboard/owner");
      } else {
        toast.danger("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.danger("Failed to submit listing.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 md:px-10">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
          Owner Dashboard
        </p>
        <h1 className="bg-gradient-to-r from-violet-300 via-cyan-300 to-slate-100 bg-clip-text text-3xl font-bold text-transparent">
          List a New Property
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          All listings go through admin review before going live.
        </p>
      </motion.div>

      <Form onSubmit={handleSubmit}>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <Section title="Basic Information">
            <div className="sm:col-span-2">
              <Field label="Property Title" name="title" placeholder="e.g. Cozy Studio in Gulshan" isRequired />
            </div>
            <Field label="Location" name="location" placeholder="e.g. Gulshan-2, Dhaka" isRequired />
            <Sel
              label="Property Type"
              name="propertyType"
              placeholder="Select type"
              isRequired
              items={["Apartment", "House", "Studio", "Villa", "Room", "Office", "Shop"]}
            />
          </Section>

          <Section title="Pricing & Rental Terms">
            <Field label="Rent (BDT)" name="rent" type="number" placeholder="e.g. 25000" isRequired />
            <Sel
              label="Rent Type"
              name="rentType"
              placeholder="Select period"
              isRequired
              accent="cyan"
              items={["Monthly", "Weekly", "Daily"]}
            />
            <Field label="Property Size (sq ft)" name="size" type="number" placeholder="e.g. 850" />
          </Section>

          <Section title="Property Details">
            <Field label="Bedrooms" name="bedrooms" type="number" placeholder="e.g. 3" isRequired />
            <Field label="Bathrooms" name="bathrooms" type="number" placeholder="e.g. 2" isRequired />
            <div className="sm:col-span-2">
              <TextField name="description" isRequired className="flex flex-col gap-1">
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Description <span className="text-violet-400">*</span>
                </Label>
                <TextArea
                  placeholder="Describe the property — highlights, nearby facilities…"
                  rows={4}
                  className={inputCls + " resize-none"}
                />
                <FieldError className="text-[11px] text-red-400" />
              </TextField>
            </div>
            <div className="sm:col-span-2">
              <TextField name="extraFeatures" className="flex flex-col gap-1">
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Extra Features
                </Label>
                <TextArea
                  placeholder="e.g. Rooftop access, generator backup, CCTV…"
                  rows={2}
                  className={inputCls + " resize-none"}
                />
              </TextField>
            </div>
          </Section>

          <motion.div variants={fadeUp}>
            <Fieldset className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 backdrop-blur-sm">
              <Fieldset.Legend className="mb-1 text-sm font-semibold text-slate-300 tracking-wide">
                Amenities
              </Fieldset.Legend>
              <p className="mb-4 text-[11px] text-slate-500">
                Toggle everything available at this property
              </p>
              <Fieldset.Group>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => {
                    const on = amenities.includes(a);
                    return (
                      <motion.button
                        type="button"
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        whileTap={{ scale: 0.93 }}
                        className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
                          on
                            ? "border-violet-500/50 bg-violet-500/15 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.12)]"
                            : "border-slate-700/50 bg-slate-900/30 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                        }`}
                      >
                        {on && "✓ "}
                        {a}
                      </motion.button>
                    );
                  })}
                </div>
                {amenities.length > 0 && (
                  <p className="mt-3 text-[11px] text-cyan-400/70">
                    {amenities.length} amenit{amenities.length > 1 ? "ies" : "y"} selected
                  </p>
                )}
              </Fieldset.Group>
            </Fieldset>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Fieldset className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 backdrop-blur-sm">
              <Fieldset.Legend className="mb-1 text-sm font-semibold text-slate-300 tracking-wide">
                Property Images
              </Fieldset.Legend>
              <p className="mb-4 text-[11px] text-slate-500">
                First image becomes the cover photo
              </p>
              <Fieldset.Group>
                <label
                  htmlFor="images"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2.5
                    rounded-2xl border-2 border-dashed border-slate-700/50
                    bg-slate-900/20 py-8
                    transition-all duration-200
                    hover:border-violet-500/40 hover:bg-slate-900/40"
                >
                  <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="text-sm font-medium text-slate-400">Click to upload images</p>
                  <p className="text-[11px] text-slate-600">PNG, JPG, WEBP — up to 5MB each</p>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImages(Array.from(e.target.files))}
                  />
                </label>

                {images.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {images.map((file, i) => (
                      <div key={i} className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-700/60">
                        <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                        {i === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 bg-violet-600/80 py-0.5 text-center text-[8px] font-bold text-white">
                            COVER
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Fieldset.Group>
            </Fieldset>
          </motion.div>

          <Section title="Owner Information">
            <Field label="Owner Name" name="ownerName" placeholder="Your full name" isRequired />
            <Field label="Contact Email" name="ownerEmail" type="email" placeholder="owner@example.com" isRequired />
            <Field label="Phone" name="ownerPhone" type="tel" placeholder="+880 1XXXXXXXXX" />
          </Section>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-end"
          >
            <div className="flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              <span className="text-[11px] font-medium text-amber-300/80">
                Submitted as <strong>Pending</strong> — awaiting admin review
              </span>
            </div>

            <div className="flex gap-2.5">
              <Button
                type="reset"
                className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-5 py-2 text-sm font-medium text-slate-400
                  transition-all hover:border-slate-600 hover:text-slate-200"
              >
                Reset
              </Button>
              <Button
                type="submit"
                isDisabled={submitting}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600
                  px-7 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/25
                  transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting…
                  </span>
                ) : (
                  "Submit Listing"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Form>
    </div>
  );
}