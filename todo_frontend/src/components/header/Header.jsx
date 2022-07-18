import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavDropDown from "./NavDropDown.jsx";

export default function Header() {
  return (
    <header>
      <nav
        aria-label="menu nav"
        className="bg-zinc-100 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start">
            <a href="#" aria-label="Home">
              <span className="text-l pl-2">Todo App</span>
            </a>
          </div>

          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block py-2 px-4 text-black no-underline"
                  href="#"
                >
                  Active
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  href="#"
                >
                  link
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <NavDropDown />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
