import { useEffect, useState } from "react";
import Image from "next/image";

interface customImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  fallback: string;
  objectFit: React.CSSProperties["objectFit"];
}

export default function CustomImage({
  src,
  alt,
  priority,
  fallback,
  objectFit,
}: customImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc ? imgSrc : fallback}
      alt={alt}
      layout="fill"
      priority={priority}
      objectFit={objectFit}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
