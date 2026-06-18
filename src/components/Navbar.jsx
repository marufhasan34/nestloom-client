"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Button, Link } from "@heroui/react";

import {
  Bars,
  House,
  Factory,
  LayoutSideContent,
  ArrowRightToLine,
  ArrowRight,
  CirclePlus,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Replace with your auth context
  const user = null;

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: House,
    },
    {
      label: "All Properties",
      href: "/properties",
      icon: Factory,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-white/80 backdrop-blur-xl">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg p-2 transition hover:bg-default-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Bars className="h-5 w-5" />
          </button>

          <NextLink
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md">
              <House className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                NestLoom
              </h1>

              <p className="text-xs text-default-500">
                Rental Marketplace
              </p>
            </div>
          </NextLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  as={NextLink}
                  href={item.href}
                  className="flex items-center gap-2 font-medium text-default-700 transition hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}

          {user && (
            <li>
              <Link
                as={NextLink}
                href="/dashboard"
                className="flex items-center gap-2 font-medium text-primary"
              >
                <LayoutSideContent className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Button
                as={NextLink}
                href="/login"
                variant="light"
                startContent={
                  <ArrowRightToLine className="h-4 w-4" />
                }
              >
                Login
              </Button>

              <Button
                as={NextLink}
                href="/register"
                color="primary"
                radius="full"
                startContent={
                  <CirclePlus className="h-4 w-4" />
                }
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              color="danger"
              variant="bordered"
              radius="full"
              startContent={
                <ArrowRight className="h-4 w-4" />
              }
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-default-200 bg-white md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    as={NextLink}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-default-100"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {user && (
              <li>
                <Link
                  as={NextLink}
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-primary hover:bg-primary-50"
                >
                  <LayoutSideContent className="h-4 w-4" />
                  Dashboard
                </Link>
              </li>
            )}

            <li className="mt-4 flex flex-col gap-2 border-t border-default-200 pt-4">
              {!user ? (
                <>
                  <Button
                    as={NextLink}
                    href="/login"
                    variant="bordered"
                    startContent={
                      <ArrowRightToLine className="h-4 w-4" />
                    }
                  >
                    Login
                  </Button>

                  <Button
                    as={NextLink}
                    href="/register"
                    color="primary"
                    startContent={
                      <CirclePlus className="h-4 w-4" />
                    }
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  color="danger"
                  variant="bordered"
                  startContent={
                    <ArrowRight className="h-4 w-4" />
                  }
                >
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}