"use client";

import { Button, Input, Select, Label, ListBox } from "@heroui/react";
import { House, ArrowRight } from "@gravity-ui/icons";

export default function Banner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
              <House className="h-4 w-4" />
              Trusted Rental Marketplace
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 lg:text-6xl">
              Find Your
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Perfect Rental
              </span>
              <br />
              Home Today
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Explore verified rental properties, connect directly with trusted
              owners, and enjoy secure online booking with seamless payment
              experiences.
            </p>
          </div>

          {/* Search Card */}
          <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Search Properties
            </h2>

            <div className="space-y-4">
              {/* Location */}
              <Input
                label="Location"
                placeholder="Dhaka, Chattogram..."
              />

              {/* Property Type */}
              <Select
                className="w-full"
                placeholder="Select Property Type"
              >
                <Label>Property Type</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="apartment"
                      textValue="Apartment"
                    >
                      Apartment
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="villa"
                      textValue="Villa"
                    >
                      Villa
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="house"
                      textValue="House"
                    >
                      House
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="studio"
                      textValue="Studio"
                    >
                      Studio
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Min Price"
                  placeholder="100"
                />

                <Input
                  type="number"
                  label="Max Price"
                  placeholder="1000"
                />
              </div>

              {/* Search Button */}
              <Button
                color="primary"
                size="lg"
                className="w-full"
                endContent={<ArrowRight />}
              >
                Search Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}