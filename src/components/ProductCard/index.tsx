import ImageWrapper from '@utils/ImageWrapper';
import Image from 'next/image';
import * as Styled from './styled';
import Link from 'next/link';
import { IProduct } from '@types';
import { COLOR } from '@styles/color';
// import { IProduct } from '@shared/types';

const ProductCard = ({ ...product }: IProduct) => {
  const { images, price, discountRate } = product.attributes;
  const currentPrice = (price * ((100 - discountRate) / 100)).toLocaleString();

  return (
    <Link href={{ pathname: 'products/[id]', query: { id: product.id } }}>
      <a>
        <ImageWrapper
          width={38}
          height={38}
          borderRadius={1}
          borderColor={COLOR.greyC4}
        >
          <Image
            src={images.data[0].attributes.formats.small.url}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </ImageWrapper>
        <Styled.Name className="ellipsis-single">
          {product.attributes.productName}
        </Styled.Name>
        <Styled.Price>
          {discountRate > 0 ? (
            <>
              <Styled.CurrentPrice>
                {currentPrice}
                <span>원</span>
              </Styled.CurrentPrice>
              <Styled.OriginalPrice>{price}원</Styled.OriginalPrice>
              <Styled.DiscountRate>{discountRate}%</Styled.DiscountRate>
            </>
          ) : (
            <Styled.CurrentPrice>
              {currentPrice}
              <span>원</span>
            </Styled.CurrentPrice>
          )}
        </Styled.Price>
      </a>
    </Link>
  );
};

export default ProductCard;
