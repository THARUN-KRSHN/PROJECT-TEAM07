"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackGradient?: string;
  fallbackClass?: string;
  containerClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackGradient = "linear-gradient(135deg, #0d281e 0%, #17382d 50%, #1f4e3d 100%)",
  fallbackClass,
  containerClassName,
  className,
  sizes,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn("w-full h-full overflow-hidden", fallbackClass, containerClassName)}
        style={{ background: fallbackGradient, position: "relative" }}
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  return (
    <div
      className={cn("w-full h-full overflow-hidden", containerClassName)}
      style={{ position: "relative" }}
    >
      <Image
        src={src}
        alt={alt}
        unoptimized
        sizes={sizes ?? "100vw"}
        className={cn("block transition-opacity duration-700", className)}
        onError={() => {
          setHasError(true);
        }}
        {...props}
      />
    </div>
  );
}
