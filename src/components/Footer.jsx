"use client";

import NextLink from "next/link";
import { Button, Input, Link } from "@heroui/react";

import {
  House,
  Bookmark,
  ArrowRight,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white">
                <House className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white">
                  NestLoom
                </h2>
                <p className="text-xs text-slate-400">
                  Rental Marketplace
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              NestLoom connects tenants and property owners
              through a secure and transparent rental booking
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  as={NextLink}
                  href="/"
                  className="text-slate-400 hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  as={NextLink}
                  href="/properties"
                  className="text-slate-400 hover:text-white"
                >
                  All Properties
                </Link>
              </li>

              <li>
                <Link
                  as={NextLink}
                  href="/login"
                  className="text-slate-400 hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  as={NextLink}
                  href="/register"
                  className="text-slate-400 hover:text-white"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Property Types
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Apartment
              </li>

              <li className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Villa
              </li>

              <li className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Studio
              </li>

              <li className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Family House
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Stay Updated
            </h3>

            <p className="mb-4 text-sm text-slate-400">
              Get notified about new properties and special
              offers.
            </p>

            <div className="space-y-3">
              <Input
              className="w-full"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />

              <Button
                color="primary"
                className="w-full"
                endContent={<ArrowRight />}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} NestLoom.
              All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="#" className="text-slate-500">
                Privacy Policy
              </Link>

              <Link href="#" className="text-slate-500">
                Terms of Service
              </Link>

              <Link href="#" className="text-slate-500">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}