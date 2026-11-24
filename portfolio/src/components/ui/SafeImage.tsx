import Image, { type ImageProps } from "next/image";

/** next/image wrapper: SVG files are served as-is, photos (jpg/png/webp) are optimized. */
export default function SafeImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} unoptimized={src.toLowerCase().endsWith(".svg") || props.unoptimized} />;
}
