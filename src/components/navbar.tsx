'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent border-b border-gray-900 text-gray-200 py-4 shadow-md">
      <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:brightness-110 transition"
          onClick={() => setMenuOpen(false)}
        >
          Java<span className="text-yellow-400">PVP</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">
            Home
          </Link>
          <Link href="/rules" className="hover:text-yellow-400 transition-colors duration-200">
            Rules
          </Link>
          <Link href="/features" className="hover:text-yellow-400 transition-colors duration-200">
            Features
          </Link>
          <Link href="/store" className="hover:text-yellow-400 transition-colors duration-200">
            Store
          </Link>
          <Link href="/discord" className="hover:text-yellow-400 transition-colors duration-200">
            Discord
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 w-6 h-6 justify-center cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 bg-white rounded transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block h-0.5 bg-white rounded transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 bg-white rounded transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`sm:hidden bg-transparent border-t border-gray-700 overflow-hidden transition-[max-height] duration-300 ${
          menuOpen ? 'max-h-64 py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-3 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/rules" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Rules
          </Link>
          <Link href="/features" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link href="/store" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Store
          </Link>
          <Link href="/discord" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
            Discord
          </Link>
        </div>
      </div>
    </nav>
  );
}