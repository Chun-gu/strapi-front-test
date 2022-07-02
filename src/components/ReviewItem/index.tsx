import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Buttons, CommentList, CustomImage, StarRating } from "@components";
import { IReview } from "@types";
import { dateConverter, ImageWrapper } from "@utils";
import authorImg from "public/assets/images/img-user-fallback.png";
import * as Styled from "./styled";
import { useModal } from "@hooks";
import { ConfirmModal } from "../Modals";
import { useMutation, useQueryClient } from "react-query";
import { deleteReview } from "@api";

const ReviewItem = ({ ...review }: IReview) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { id, author, rating, content, image, createdAt } = review;

  const deleteConfirmModal = useModal(`deleteConfirm/review-${review.id}`);
  const errorModal = useModal("error");

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getReviews"]);
      deleteConfirmModal.close();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const jwt = session?.jwt as string;
  const handleDelete = (jwt: string, id: number) => {
    mutate({ jwt, review: id });
  };

  const onClickDelete = () => {
    deleteConfirmModal.open();
  };

  return (
    <Styled.ReviewContainer>
      <Styled.ReviewInfo>
        <ImageWrapper width={4} height={4} borderRadius="50%">
          <Image src={authorImg} layout="fill" alt="작성자 프로필 이미지" />
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
            {image !== null && (
              <ImageWrapper width={50} height={50}>
                <CustomImage
                  src={image.medium || image.small || image.thumbnail}
                  alt="리뷰 사진"
                  objectFit="contain"
                  fallback="/assets/images/img-product-fallback.png"
                />
              </ImageWrapper>
            )}
            <CommentList reviewId={id} />
          </>
        )}
        <Styled.ButtonsWrapper>
          {session?.user?.id === author.id && (
            <>
              <Buttons.Custom
                width={5}
                height={3}
                color="green"
                fontSize={1.6}
                disabled={false}
              >
                수정
              </Buttons.Custom>
              <Buttons.Custom
                width={5}
                height={3}
                color="red"
                fontSize={1.6}
                disabled={false}
                onClick={onClickDelete}
              >
                삭제
              </Buttons.Custom>
              {deleteConfirmModal.modal.isOpen && (
                <ConfirmModal
                  modalId={`deleteConfirm/review-${review.id}`}
                  onClose={() => handleDelete(jwt, id)}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
          <Styled.ExpansionButton onClick={handleClick} isOpen={isOpen}>
            {isOpen ? "접 기" : "더보기"}
          </Styled.ExpansionButton>
        </Styled.ButtonsWrapper>
      </Styled.ReviewContent>
      {!isOpen && (
        <ImageWrapper width={8} height={8}>
          {image !== null && (
            <CustomImage
              src={image.thumbnail}
              alt="리뷰 사진"
              priority={true}
              objectFit="cover"
              fallback="/assets/images/img-product-fallback.png"
            />
          )}
        </ImageWrapper>
      )}
    </Styled.ReviewContainer>
  );
};

export default ReviewItem;
