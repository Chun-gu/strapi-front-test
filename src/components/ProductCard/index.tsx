import ImageWrapper from '@utils/ImageWrapper';
import Image from 'next/image';
import ProductImage from '/public/images/product-img-small-1.png';
import * as Styled from './styled';

const ProductCard = () => {
  return (
    <div>
      <ImageWrapper width={38} height={38} >
        <Image src={ProductImage} layout="fill" />
      </ImageWrapper>
      <Styled.Name>Hack Your Life 개발자 노트북 파우치</Styled.Name>
      <Styled.Price>{(29000).toLocaleString()}원</Styled.Price>
    </div>
  );
};

export default ProductCard;
