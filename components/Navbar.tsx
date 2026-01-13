"use client";

import { useAuth } from "@/context/StateContext";
import Image from "next/image";
// import SearchInput from "./SearchInput";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser, fetchTaskList } = useAuth();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post(`/api/logout`);
      if (data.success) {
        setUser(null);
        fetchTaskList();
        toast("logout successfully");
      } else {
        console.log("some backend error while logout");
      }
    } catch (error) {
      console.log("frontend error while logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 ">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Image src="/logo.png" alt="logo" width={70} height={70} />

          {/* Search (Desktop) */}
          {/* <div className="hidden md:block w-[40%]">
            <SearchInput />
          </div> */}

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <Link href="/">
              <li className="hover:text-amber-500 cursor-pointer transition">
                Task List
              </li>
            </Link>
            <Link href="/addTask">
              <li className="hover:text-amber-500 cursor-pointer transition">
                Add Task
              </li>
            </Link>

            {user ? (
              <>
                <Link href="/profile">
                  <li className="hover:text-amber-500 cursor-pointer transition">
                    Profile
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 cursor-pointer transition"
                >
                  Logout
                </li>
              </>
            ) : (
              <Link href="/login">
                <li className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition cursor-pointer">
                  Login
                </li>
              </Link>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[500px] mt-4" : "max-h-0"
          }`}
        >
          {/* Search (Mobile) */}
          {/* <div className="mb-4">
            <SearchInput />
          </div> */}

          <ul className="flex flex-col gap-4 text-sm font-medium text-white">
            <Link href="/">
              <li className="hover:text-amber-500 cursor-pointer">Task List</li>
            </Link>
            <Link href="/addTask">
              <li className="hover:text-amber-500 cursor-pointer">Add Task</li>
            </Link>
            {user ? (
              <>
                <Link href="/profile">
                  <li className="hover:text-amber-500 cursor-pointer">
                    Profile
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <Link href="/login">
                <li className="w-fit px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 cursor-pointer">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
