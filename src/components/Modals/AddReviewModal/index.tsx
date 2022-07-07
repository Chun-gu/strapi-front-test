import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import router from "next/router";
import { useSession } from "next-auth/react";
import { addReview, updateReview } from "@api";
import { Buttons, Spinner, StarRating, CustomImage } from "@components";
import { IAddReviewValues } from "@types";
import { useModal } from "@hooks";
import ModalContainer from "../ModalContainer";
import CloseIcon from "public/assets/icons/icon-delete.svg";
import { Title, Wrapper, CloseButton, Input as input } from "../styled";
import styled from "styled-components";
import { ImageWrapper } from "@utils";
import { COLOR } from "@styles/color";

const Input = styled(input)`
  height: 30rem;
`;

const Caution = styled.p`
  margin: 1rem 0 2rem;
`;

const ImageLabel = styled.label<{ preview: string | null | undefined }>`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  ${({ preview }) =>
    preview ??
    `
    background-image: url("/assets/icons/icon-preview-background.svg"); 
    background-size: 10rem;
    `}
`;

const Preview = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid ${COLOR.greyE0};
  position: relative;
`;

const PreviewDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${COLOR.greyC4};
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 20;
  svg {
    path {
      stroke: ${COLOR.black};
    }
  }
  &:hover {
    background-color: ${COLOR.red};
    svg {
      path {
        stroke: ${COLOR.white};
      }
    }
  }
`;

interface Props {
  modalId: string;
}

const AddReviewModal = ({ modalId }: Props) => {
  const { data: session } = useSession();
  const { productId } = router.query;

  const addReviewModal = useModal({ modalId });
  const postDoneModal = useModal({ modalId: "postDone" });
  const updateDoneModal = useModal({ modalId: "updateDone" });
  const errorModal = useModal({ modalId: "error" });

  const reviewId = addReviewModal.modal.prevData?.id;
  const prevRating = addReviewModal.modal.prevData?.rating;
  const prevContent = addReviewModal.modal.prevData?.content;
  const prevImage = addReviewModal.modal.prevData?.image?.thumbnail || null;

  const [rating, setRating] = useState<number>(prevRating || 5);

  const {
    reset,
    resetField,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAddReviewValues>({
    mode: "onChange",
    defaultValues: {
      content: prevContent || "",
    },
  });

  const [preview, setPreview] = useState<string | null>(prevImage);

  const validateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (!images || images.length === 0) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(images[0].type)) {
      alert(".png / .jpg / .jpeg 확장자의 이미지만 등록할 수 있습니다.");
      resetField("image");
      setPreview(null);

      return;
    }
    if (images[0].size > 1048576) {
      alert("1MB 이하의 이미지만 등록할 수 있습니다.");
      resetField("image");
      setPreview(null);

      return;
    }
    setPreview(URL.createObjectURL(images[0]));
  };

  const deletePreview = () => {
    setPreview(null);
    resetField("image");
  };

  const queryClient = useQueryClient();
  const { mutate: post, isLoading: isPosting } = useMutation(addReview, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getReviews"]);
      postDoneModal.open();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation(updateReview, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getReviews"]);
      updateDoneModal.open();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const handleClose = () => {
    if (isPosting || isUpdating) return;
    addReviewModal.closeAll();
  };

  const onSubmit = async () => {
    const author = session?.user?.id as number;
    const jwt = session?.jwt as string;
    const { image, content } = getValues();
    if (modalId === "addReview") {
      post({ author, jwt, product: productId, rating, image, content });
    } else {
      update({
        author,
        jwt,
        product: productId,
        review: reviewId,
        rating,
        image,
        content,
      });
    }
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ModalContainer closeModal={handleClose}>
      {(isPosting || isUpdating) && <Spinner />}
      <Wrapper>
        <Title>리뷰 작성</Title>
        <StarRating rating={rating} readOnly={false} setRating={setRating} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Caution>리뷰 사진은 한 번 등록하면 변경할 수 없습니다.</Caution>
          <Preview>
            <ImageWrapper width={10} height={10}>
              {(preview || prevImage) && (
                <CustomImage
                  src={preview || prevImage || ""}
                  alt="리뷰 이미지 미리보기"
                  fallback=""
                  objectFit="contain"
                />
              )}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                {...register("image", {
                  onChange: (e) => validateImage(e),
                })}
                disabled={!!prevImage}
                style={{ display: "none" }}
              />
              <ImageLabel htmlFor="image" preview={preview}>
                <span className="sr-only">이미지 첨부하기</span>
              </ImageLabel>
            </ImageWrapper>
            {((modalId === "updateReview" && !prevImage && preview) ||
              (modalId === "addReview" && preview)) && (
              <PreviewDeleteButton
                type="button"
                onClick={deletePreview}
                disabled={isPosting || isUpdating}
              >
                <span className="sr-only">이미지 제거하기</span>
                <CloseIcon width={20} height={20} />
              </PreviewDeleteButton>
            )}
          </Preview>
          <div>
            <label htmlFor="content" className="sr-only">
              리뷰 내용
            </label>
            <Input
              id="content"
              placeholder="리뷰를 작성하세요. (10자 ~ 200자)"
              {...register("content", {
                required: true,
                minLength: 10,
                maxLength: 200,
              })}
            />
          </div>
          <Buttons.Custom
            type="submit"
            width={10}
            height={3}
            fontSize={1.6}
            color="green"
            disabled={!isValid || isPosting}
          >
            작성
          </Buttons.Custom>
        </form>
        <CloseButton onClick={handleClose}>
          <span className="sr-only">리뷰 작성창 닫기</span>
          <CloseIcon width={18} height={18} />
        </CloseButton>
      </Wrapper>
    </ModalContainer>
  );
};

export default AddReviewModal;
