import { useEffect, useState } from "react";
import Image from "next/image";

interface customImageProps {
  src: string;
  alt: string;
  fallback: string;
}

export default function CustomImage({ src, alt, fallback }: customImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc ? imgSrc : fallback}
      alt={alt}
      layout="fill"
      objectFit="cover"
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
