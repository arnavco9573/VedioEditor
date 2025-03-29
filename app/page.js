"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex  flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Welcome to the Online Video Editor</h1>
      <p className="text-lg text-gray-600 text-center max-w-lg">
        Create, edit, and export your videos effortlessly with our powerful online editor.
      </p>
      <Link href="/editor">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Editor
        </button>
      </Link>
    </div>
  );
}
