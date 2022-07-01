import { MouseEvent, useState } from "react";
import { CustomImage } from "@components";
import { IImage } from "@types";
import { ImageWrapper } from "@utils";
import PrevCaret from "public/assets/icons/icon-caret-prev.svg";
import NextCaret from "public/assets/icons/icon-caret-next.svg";
import * as Styled from "./styled";

interface IProductImageProps {
  productImages: IImage[];
}

const ProductImage = ({ productImages }: IProductImageProps) => {
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
          <CustomImage
            src={
              productImages[currentSlideNum].medium ||
              productImages[currentSlideNum].small ||
              productImages[currentSlideNum].thumbnail
            }
            objectFit="cover"
            priority={true}
            fallback="/assets/images/img-product-fallback.png"
            alt={`제품의 ${currentSlideNum + 1}번째 이미지`}
          />
        </ImageWrapper>
        {productImages?.length > 1 && (
          <>
            <Styled.PrevButton onClick={toPrevSlide}>
              <PrevCaret width={15} height={50} />
            </Styled.PrevButton>
            <Styled.NextButton onClick={toNextSlide}>
              <NextCaret width={15} height={50} />
            </Styled.NextButton>
          </>
        )}
      </Styled.ImageSlider>
      <Styled.Thumbnails>
        {productImages.length > 1 &&
          productImages.map((image, index) => (
            <button
              type="button"
              key={`thumbnail-${index}`}
              data-slide-num={index}
              onClick={onClickThumbnail}
            >
              <ImageWrapper width={7} height={7}>
                <CustomImage
                  src={image.thumbnail}
                  objectFit="cover"
                  fallback="/assets/images/img-product-fallback.png"
                  alt={`제품의 ${index + 1}번째 썸네일`}
                />
              </ImageWrapper>
            </button>
          ))}
      </Styled.Thumbnails>
    </Styled.ProductImage>
  );
};

export default ProductImage;
