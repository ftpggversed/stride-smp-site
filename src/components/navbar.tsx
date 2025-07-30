'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-transparent border-b border-gray-900 text-gray-200 py-4 shadow-md">
      <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:brightness-110 transition"
        >
          Stride <span className="text-blue-400">SMP</span>
        </Link>
        <div className="hidden sm:flex space-x-6 text-lg font-medium">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/rules"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Rules
          </Link>
          <Link
            href="/features"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/store"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Store
          </Link>
          <Link
            href="/discord"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Discord
          </Link>
        </div>
      </div>
    </nav>
  );
}
