"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-300 p-5 space-x-3">
      <Link className="pr-5 b" href={"/"}>
        Next.js
      </Link>
      <Link className="pr-5" href={"/users"}>
        Users
      </Link>
      {status === "loading" && <span className="loading loading-dots"></span>}
      {status === "authenticated" && (
        <div>
          {session.user?.name}
          <Link href="api/auth/signout" className=" ml-4">
            Sign Out
          </Link>
          <Link href="auth/account" className=" ml-4">
            Account Settings
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <>
          <Link href="/api/auth/signin">Login</Link>
          <Link href="/auth/new-user">Register</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
