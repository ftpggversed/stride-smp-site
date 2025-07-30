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

        <h2 className="relative text-3xl font-semibold mb-6 text-yellow-400">
          You found the void.
        </h2>

        <p className="relative text-gray-300 mb-10 leading-relaxed">
          This page is either gone, misplaced, or just never existed.<br />
          Maybe it rage-quit... maybe it got banned. Who knows.<br />
          Either way, let’s get you back to spawn.
        </p>

        <Link
          href="/"
          className="relative inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition text-white font-semibold rounded-xl px-6 py-4 shadow-lg shadow-yellow-800/40 select-none"
        >
          <FiHome className="w-6 h-6" /> Back to Base
        </Link>
      </div>
    </main>
  );
}