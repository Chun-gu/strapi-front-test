import { MouseEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import ImageWrapper from '@utils/ImageWrapper';
import Image from 'next/image';
import PrevCaret from 'public/images/icon-caret-prev.svg';
import NextCaret from 'public/images/icon-caret-next.svg';
import * as Styled from './styled';

interface IProductImageProps {
  productImages: string[];
}

export function ProductImage({ productImages }: IProductImageProps) {
  const totalSlideCount = productImages.length;
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
        <ImageWrapper width="60rem" height="60rem">
          <Image src={productImages[currentSlideNum]} layout="fill" />
        </ImageWrapper>
        {productImages.length > 1 && (
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
              key={nanoid()}
              data-slide-num={index}
              onClick={onClickThumbnail}
            >
              <ImageWrapper width="7rem" height="7rem">
                <Image src={img} layout="fill" />
              </ImageWrapper>
            </button>
          ))}
      </Styled.Thumbnails>
    </Styled.ProductImage>
  );
}
