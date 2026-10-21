"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-white transition-opacity duration-500"
      role="status"
      aria-label="Loading GiriRaksha"
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <Image
          src="/logo.png"
          alt="GiriRaksha"
          width={220}
          height={147}
          priority
          className="h-auto w-44 object-contain sm:w-56"
        />
        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#E1E6E1]">
          <div className="h-full w-1/2 animate-[intro-progress_1.4s_ease-in-out_infinite] rounded-full bg-[#247343]" />
        </div>
      </div>
    </div>
  );
}
