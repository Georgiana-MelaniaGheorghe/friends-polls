import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Friend Poll
        </Link>

        <nav className="flex items-center gap-4">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>

              <Link
                href="/poll/new"
                className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Create Poll
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}