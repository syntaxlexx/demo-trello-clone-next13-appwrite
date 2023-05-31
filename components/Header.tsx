"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div
          className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-96 
          bg-gradient-to-br 
          from-pink-400 
          to-primary 
          rounded-md 
            filter 
            blur-3xl 
            opacity-50 
            -z-50
        "
        ></div>
        <Image
          src="/trello-full.png"
          alt="logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        ></Image>

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search */}
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"></MagnifyingGlassIcon>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            ></input>
            <button hidden type="submit">
              Search
            </button>
          </form>

          {/* avatar */}
          <Avatar name="Syntax Lexx" round color="#0055D1" size="50"></Avatar>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className=" flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-primary">
          <UserCircleIcon className="inline-block h-10 w-10 text-primary mr-1"></UserCircleIcon>
          GPT is summarising your tasks for the day...
        </p>
      </div>
    </header>
  );
}

export default Header;
