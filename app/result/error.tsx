"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-md mx-auto my-16 p-8 text-center flex flex-col gap-4">
      <p className="text-red-600 font-semibold">Failed to get a prediction.</p>
      <button onClick={reset} className="underline">Try again</button>
      <Link href="/" className="underline">Back to form</Link>
    </div>
  );
}