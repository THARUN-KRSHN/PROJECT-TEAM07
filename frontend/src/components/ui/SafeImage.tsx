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
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: fallbackGradient }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-700",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
