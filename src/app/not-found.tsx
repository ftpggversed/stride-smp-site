'use client';

import Link from 'next/link';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-white">
      <div className="relative max-w-md w-full text-center">
        {/* Glowing Circle behind icon */}
        <div className="absolute inset-0 rounded-full bg-red-600 opacity-20 blur-3xl animate-pulse"></div>

        <FiAlertTriangle className="relative mx-auto mb-8 text-red-500 w-20 h-20 drop-shadow-lg" />

        <h1 className="relative text-8xl font-extrabold mb-4 tracking-tight select-none">404</h1>

        <h2 className="relative text-3xl font-semibold mb-6 text-blue-400">
          Well, this is awkward...
        </h2>

        <p className="relative text-gray-300 mb-10 leading-relaxed">
          This page wandered off somewhere else — probably on a coffee break ☕️.<br />
          Either that or it never existed. Either way, it’s lost in the void.<br />
          Don’t worry, we’ve sent a search party (you). Try heading back home!
        </p>

        <Link
          href="/"
          className="relative inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition text-white font-semibold rounded-xl px-6 py-4 shadow-lg shadow-blue-800/40 select-none"
        >
          <FiHome className="w-6 h-6" /> Rescue Me!
        </Link>
      </div>
    </main>
  );
}
