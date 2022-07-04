import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="px-4 py-2 bg-zinc-200 flex items-center">
      <div className="logo p-1 mr-4">Todo</div>
      <div className="nav-links">
        <ul className="flex flex-row">
          <li className="p-1.5">
            <Link to={"home"}>Home</Link>
          </li>
          <li className="p-1.5">
            <a href="">Link</a>
          </li>
          <li className="p-1.5">
            <a href="">Link 2</a>
          </li>
        </ul>
      </div>
      <div className="user-nav flex flex-auto justify-end items-center ml-auto">
        <p className="p-2">Username</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}
