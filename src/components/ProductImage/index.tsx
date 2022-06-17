import { MouseEvent, useState } from "react";
import Image from "next/image";
import { IImage } from "@types";
import ImageWrapper from "@utils/ImageWrapper";
import PrevCaret from "public/images/icon-caret-prev.svg";
import NextCaret from "public/images/icon-caret-next.svg";
import * as Styled from "./styled";

interface IProductImageProps {
  productImages: IImage[];
}

export default function ProductImage({ productImages }: IProductImageProps) {
  const totalSlideCount = productImages?.length ?? 1;
  const [currentSlideNum, setCurrentSlideNum] = useState(0);

  const toPrevSlide = () => {
    if (currentSlideNum === 0) {
      setCurrentSlideNum(totalSlideCount - 1);
    } else {
      setCurrentSlideNum(currentSlideNum - 1);
    }
  };

  const toNextSlide = () => {
    if (currentSlideNum === totalSlideCount - 1) {
      setCurrentSlideNum(0);
    } else {
      setCurrentSlideNum(currentSlideNum + 1);
    }
  };

  const onClickThumbnail = (e: MouseEvent<HTMLButtonElement>) => {
    const { slideNum } = e.currentTarget.dataset as { slideNum: string };
    setCurrentSlideNum(+slideNum);
  };

  return (
    <Styled.ProductImage>
      <Styled.ImageSlider>
        <ImageWrapper width={60} height={60}>
          <Image
            src={productImages[currentSlideNum].medium}
            layout="fill"
            objectFit="cover"
            priority={true}
            alt="제품 사진"
          />
        </ImageWrapper>
        {productImages?.length > 1 && (
          <>
            <Styled.PrevButton onClick={toPrevSlide}>
              <PrevCaret />
            </Styled.PrevButton>
            <Styled.NextButton onClick={toNextSlide}>
              <NextCaret />
            </Styled.NextButton>
          </>
        )}
      </Styled.ImageSlider>
      <Styled.Thumbnails>
        {productImages.length > 1 &&
          productImages.map((img, index) => (
            <button
              type="button"
              key={`thumbnail-${index}`}
              data-slide-num={index}
              onClick={onClickThumbnail}
            >
              <ImageWrapper width={7} height={7}>
                <Image
                  src={img.thumbnail}
                  layout="fill"
                  objectFit="cover"
                  alt={`${index}번째 제품 사진`}
                />
              </ImageWrapper>
            </button>
          ))}
      </Styled.Thumbnails>
    </Styled.ProductImage>
  );
}
