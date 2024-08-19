"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { CiUser } from "react-icons/ci";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    // <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
    //   <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    //     <a href="#" className="text-xl font-bold mb-4 md:mb-0">
    //       Carrer Company
    //     </a>
    //     {session ? (
    //       <>
    //         <span className="mr-4 text-xl">
    //           Welcome, {user.username || user.email}
    //         </span>
    //         <Button
    //           onClick={() => signOut()}
    //           className="w-full md:w-auto bg-slate-100 text-black"
    //           variant="outline"
    //         >
    //           Logout
    //         </Button>
    //       </>
    //     ) : (
    //       <Link href="/sign-in">
    //         <Button
    //           className="w-full md:w-auto bg-slate-100 text-black"
    //           variant={"outline"}
    //         >
    //           Login
    //         </Button>
    //       </Link>
    //     )}
    //   </div>
    // </nav>
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#5e0797] text-white p-8">
    <Link
      href="/"
      className="flex gap-4 items-center justify-center"
      prefetch={false}
    >
      <MountainIcon className="h-6 w-6" />
      <a href="#" className="text-xl font-bold mb-4 md:mb-0">
        Carrer Company
      </a>
    </Link>
    <nav className="ml-auto flex justify-center items-center gap-8 sm:gap-8">
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
      >
        Mentors
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
      >
        Pricing
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
      >
        About
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
      >
        Contact
      </Link>
      {session ? (
      <>
        <span className="flex gap-2 justify-center items-center text-xl font-large bg-white text-black py-2 px-3  rounded-lg">
        <CiUser />{user.username || user.email}
        </span>
        <Button
          onClick={() => signOut()}
          className="w-full md:w-auto bg-slate-100 text-black"
          variant="outline"
        >
          Logout
        </Button>
      </>
    ) : (
      <Link href="/sign-in">
        <Button
          className="w-full md:w-auto bg-slate-100 text-black"
          variant={"outline"}
        >
          Login
        </Button>
      </Link>
    )}
    </nav>
  </header>
  );
}

export default Navbar;


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
