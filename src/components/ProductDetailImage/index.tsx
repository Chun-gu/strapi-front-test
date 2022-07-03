import { useState } from "react";
import Image from "next/image";
import UpIcon from "public/assets/icons/icon-caret-up.svg";
import DownIcon from "public/assets/icons/icon-caret-down.svg";
import * as Styled from "./styled";

interface Props {
  src: string;
}

const ProductDetailImage = ({ src }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickViewMore = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Styled.Wrapper isOpen={isOpen}>
        <Image src={src} layout="fill" alt="" priority />
      </Styled.Wrapper>
      <Styled.ViewMore isOpen={isOpen}>
        <Styled.ViewMoreButton onClick={onClickViewMore}>
          {!isOpen ? (
            <>
              <span>상품정보 더보기</span>
              <DownIcon width={30} height={30} />
            </>
          ) : (
            <>
              <span>상품정보 접기</span>
              <UpIcon width={30} height={30} />
            </>
          )}
        </Styled.ViewMoreButton>
      </Styled.ViewMore>
    </>
  );
};

export default ProductDetailImage;
