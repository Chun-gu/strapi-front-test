import { useState } from 'react';
import Image from 'next/image';
import { dateConverter } from '@utils/dateConverter';
import { IReview } from '@shared/types';
import ImageWrapper from '@utils/ImageWrapper';
import authorImg from 'public/images/product-img-small-1.png';
import reviewImg from 'public/images/product-img-lg.png';
import StarRating from '../StarRating';
import { CommentList } from '../CommentList';
import * as Styled from './styled';

export function ReviewItem({
  _id,
  user: { nickname },
  rating,
  images,
  content,
  createdAt
}: IReview) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Styled.ReviewContainer>
      <Styled.ReviewInfo>
        <ImageWrapper width="4rem" height="4rem" imgStyle="border-radius: 50%;">
          <Image src={authorImg} layout="fill" />
        </ImageWrapper>
        <div>
          <Styled.RatingWrapper>
            <StarRating rating={rating} readOnly />
          </Styled.RatingWrapper>
          <Styled.Author>{nickname}</Styled.Author>
          <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
        </div>
      </Styled.ReviewInfo>
      <Styled.ReviewContent isOpen={isOpen}>
        <Styled.ReviewText isOpen={isOpen}>{content}</Styled.ReviewText>
        {isOpen && (
          <>
            {images.length > 0 && (
              <ImageWrapper width="40rem" height="40rem">
                <Image src={reviewImg} layout="fill" />
              </ImageWrapper>
            )}
            <CommentList reviewId={_id} />
          </>
        )}
        <Styled.ExpansionButton onClick={handleClick} isOpen={isOpen}>
          {isOpen ? '접 기' : '더보기'}
        </Styled.ExpansionButton>
      </Styled.ReviewContent>
      {!isOpen && (
        <ImageWrapper width="8rem" height="8rem">
          <Image src={reviewImg} layout="fill" />
        </ImageWrapper>
      )}
    </Styled.ReviewContainer>
  );
}
