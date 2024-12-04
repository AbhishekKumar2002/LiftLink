"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import {
  Bars3Icon,
  XMarkIcon,
  XmarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import MenuOverlay from "./MenuOverLay";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import SearchresultList from "./SearchresultList";
import DropdownMenuDemo from "./sidebar";

const NavLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Price",
    path: "/price-comparison",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const [results, setResults] = useState([]);
  return (
    <nav className="h-16 fixed top-0 left-0 right-0 dark:bg-[#8039fa]/40 bg-[#7395EA] bg-opacity-80 z-50">
      <div className="flex flex-wrap items-center justify-between mx-auto p-8 px-4 py-2">
        {/* <Link href={"/"} className="text-2xl md:text-5xl  font-semibold">
          <Image
            src="/images/logo.png"
            className="h-12 w-12 rounded-full"
            height={2000}
            width={2000}
          />
        </Link> */}
        <Link
          href={"/"}
          className="text-2xl md:text-4xl text-white font-semibold"
        >
          Lift Link
        </Link>

        <div className="ml-10 w-50 hidden sm:flex"></div>

        <div className="mobile-menu flex md:hidden">
          <div className="mr-2 mt-2">
            <ThemeToggle />
          </div>
          {/* {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded mr-2"
            >
              <Bars3Icon className="h-5 w-5 dark:text-slate-200 " />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded mr-2"
            >
              <XMarkIcon className="h-5 w-5  dark:text-slate-200" />
            </button>
          )} */}
          <div className="mt-2" onClick={handleShowMenu}>
            <DropdownMenuDemo />
          </div>
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-2">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>
              <div className="flex flex-1 justify-end">
                <ThemeToggle />
              </div>
            </li>
            <li>
              <DropdownMenuDemo />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;