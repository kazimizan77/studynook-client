"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/");
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EE]/80 dark:bg-[#0d2137]/80 backdrop-blur-md border-b border-[#E9E4D8] dark:border-[#1B3A4B]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-(family-name:--font-cormorant) text-2xl font-semibold tracking-tight"
        >
          <span className="text-[#1B3A4B] dark:text-white">Study</span>
          <span className="text-[#2D6A4F]">Nook</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#2D6A4F] font-medium"
                    : "text-[#1B3A4B]/70 dark:text-[#74C69D]/70 hover:text-[#2D6A4F] dark:hover:text-[#74C69D]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link
                href="/add-room"
                className={`text-sm transition-colors duration-200 ${
                  pathname === "/add-room"
                    ? "text-[#2D6A4F] font-medium"
                    : "text-[#1B3A4B]/70 dark:text-[#74C69D]/70 hover:text-[#2D6A4F] dark:hover:text-[#74C69D]"
                }`}
              >
                Add Room
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border-2 border-[#2D6A4F]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-[#1B3A4B] dark:text-white font-medium">
                  {user.name?.split(" ")[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#152a3a] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-xl shadow-lg py-1 z-50">
                  <Link
                    href="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#1B3A4B] dark:text-white hover:bg-[#F8F5EE] dark:hover:bg-[#1B3A4B] transition-colors"
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/add-room"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#1B3A4B] dark:text-white hover:bg-[#F8F5EE] dark:hover:bg-[#1B3A4B] transition-colors"
                  >
                    Add Room
                  </Link>
                  <hr className="border-[#E9E4D8] dark:border-[#1B3A4B] my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#B5451B] hover:bg-[#F8F5EE] dark:hover:bg-[#1B3A4B] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[#1B3A4B]/70 dark:text-[#74C69D]/70 hover:text-[#2D6A4F] dark:hover:text-[#74C69D] transition-colors px-4 py-2 rounded-lg border border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F] dark:hover:border-[#74C69D]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-[#1B3A4B] dark:text-[#74C69D] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#F8F5EE] dark:bg-[#0d2137] border-t border-[#E9E4D8] dark:border-[#1B3A4B] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${
                pathname === link.href
                  ? "text-[#2D6A4F] font-medium"
                  : "text-[#1B3A4B]/70 dark:text-[#74C69D]/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-[#E9E4D8] dark:border-[#1B3A4B]" />
          {user ? (
            <>
              <Link
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#1B3A4B] dark:text-white"
              >
                My Bookings
              </Link>
              <Link
                href="/add-room"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#1B3A4B] dark:text-white"
              >
                Add Room
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-sm text-[#B5451B]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#1B3A4B]/70 dark:text-[#74C69D]/70"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#2D6A4F]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
