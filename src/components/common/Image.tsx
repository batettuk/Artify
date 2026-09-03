"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/images/placeholder.svg";

function getFileUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  const assetOrigin = process.env.NEXT_PUBLIC_ERXES_ASSET_ORIGIN || "";
  if (!assetOrigin) return "";

  const fileUrl = new URL("/gateway/pl:core/read-file", assetOrigin);
  fileUrl.searchParams.set("key", url);
  return fileUrl.toString();
}

function isSvg(src: string): boolean {
  return src.split("?")[0].toLowerCase().endsWith(".svg");
}

type ImageProps = Omit<NextImageProps, "src"> & {
  src?: string | null;
  fallback?: string;
};

export default function Image({
  src,
  fallback = PLACEHOLDER,
  alt = "",
  unoptimized,
  ...props
}: ImageProps) {
  const resolved = getFileUrl(src || "") || fallback;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgSrc = failedSrc === resolved ? fallback : resolved;

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized={unoptimized ?? (isSvg(src || "") || isSvg(imgSrc))}
      onError={() => setFailedSrc(resolved)}
    />
  );
}
