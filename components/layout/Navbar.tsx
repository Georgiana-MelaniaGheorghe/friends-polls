import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import {
  LayoutDashboard,
  PlusCircle,
  LogIn,
  UserPlus,
  Vote,
} from "lucide-react";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight transition hover:opacity-80"
        >
          <Vote className="h-7 w-7 text-blue-600" />
          <span>Friend Poll</span>
        </Link>

        <nav className="flex items-center gap-3">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-4 py-2 transition hover:bg-gray-100"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                href="/poll/new"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                <PlusCircle size={18} />
                Create Poll
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 rounded-lg px-4 py-2 transition hover:bg-gray-100"
              >
                <LogIn size={18} />
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}