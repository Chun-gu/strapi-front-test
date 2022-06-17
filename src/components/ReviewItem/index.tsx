import { useState } from "react";
import Image from "next/image";
import { IReview } from "@types";
import ImageWrapper from "@utils/ImageWrapper";
import { dateConverter } from "@utils/dateConverter";
import StarRating from "../StarRating";
import { CommentList } from "../CommentList";
import authorImg from "public/images/product-img-small-1.png";
import * as Styled from "./styled";

export function ReviewItem({ ...review }: IReview) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const { id, author, rating, content, images, createdAt } = review;

  return (
    <Styled.ReviewContainer>
      <Styled.ReviewInfo>
        <ImageWrapper width={4} height={4} borderRadius="50%">
          <Image src={authorImg} layout="fill" alt="작성자 사진" />
        </ImageWrapper>
        <div>
          <Styled.RatingWrapper>
            <StarRating rating={rating} readOnly />
          </Styled.RatingWrapper>
          <Styled.Author>{author.username}</Styled.Author>
          <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
        </div>
      </Styled.ReviewInfo>
      <Styled.ReviewContent isOpen={isOpen}>
        <Styled.ReviewText isOpen={isOpen}>{content}</Styled.ReviewText>
        {isOpen && (
          <>
            {images.length > 0 && (
              <ImageWrapper width={40} height={40}>
                <Image
                  src={images[0].medium}
                  layout="fill"
                  objectFit="cover"
                  alt="리뷰 사진"
                />
              </ImageWrapper>
            )}
            <CommentList reviewId={id} />
          </>
        )}
        <Styled.ExpansionButton onClick={handleClick} isOpen={isOpen}>
          {isOpen ? "접 기" : "더보기"}
        </Styled.ExpansionButton>
      </Styled.ReviewContent>
      {!isOpen && (
        <ImageWrapper width={8} height={8}>
          <Image
            src={images[0].thumbnail}
            layout="fill"
            objectFit="cover"
            alt="리뷰 사진"
          />
        </ImageWrapper>
      )}
    </Styled.ReviewContainer>
  );
}
