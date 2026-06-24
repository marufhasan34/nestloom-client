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
import { useSession } from "@/lib/auth-client";
import { NavDropDown } from "./NavDropDown";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data: session, isPending} = useSession()
  const user = session?.user

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
        {/* Logo - always left */}
        <NextLink href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md">
            <House className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">NestLoom</h1>
            <p className="text-xs text-default-500">Rental Marketplace</p>
          </div>
        </NextLink>

        {/* Desktop Navigation - middle */}
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

          
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop auth buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <>
                <Link href="/auth/signin">
                  <Button
                    variant="light"
                    startContent={<ArrowRightToLine className="h-4 w-4" />}
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button
                    color="primary"
                    startContent={<CirclePlus className="h-4 w-4" />}
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
             <NavDropDown />
            )}
          </div>

          {/* Hamburger - mobile only, right side */}
          <button
            className="rounded-lg p-2 transition hover:bg-default-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Bars className="h-5 w-5" />
          </button>
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

            

            <li className="mt-4 flex flex-col gap-2 border-t border-default-200 pt-4">
              {!user ? (
                <>
                    <Link href="/auth/signin">
                  <Button
                    variant="light"
                    startContent={<ArrowRightToLine className="h-4 w-4" />}
                  >
                    Login
                  </Button>
                </Link>

                  <Link href="/auth/signup">
                    <Button
                      as={NextLink}
                      color="primary"
                      startContent={<CirclePlus className="h-4 w-4" />}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
               <NavDropDown />
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
