import { addReview } from "@api";
import { Buttons } from "@components";
import { IAddReviewValues } from "@types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useModal } from "src/atoms/modalAtom";
import Spinner from "src/components/Spinner";
import StarRating from "src/components/StarRating";
import AlertModal from "../AlertModal";
import ModalContainer from "../ModalContainer";
import CloseIcon from "public/images/icon-delete.svg";
import { Title, Wrapper, CloseButton } from "../styled";
import * as Styled from "./styled";

type AddReviewModalProps = { productId: string | string[] | undefined };

const AddReviewModal = ({ productId }: AddReviewModalProps) => {
  const { data: session } = useSession();
  const addReviewModal = useModal("addReviewModal");
  const alertModal = useModal("alertModal");

  const [rating, setRating] = useState(1);

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAddReviewValues>({ mode: "onChange" });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addReview, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["getReviews"]);
      alertModal.addText("작성을 완료했습니다.");
      alertModal.openModal();
    },
    onError: (error) => {
      alertModal.addText(
        "작성에 실패했습니다. 잠시 후 다시 시도해주시기 바랍니다.",
      );
      alertModal.openModal();
    },
  });

  const handleClose = () => {
    if (isLoading) return;
    addReviewModal.closeModal();
  };

  const onSubmit = async () => {
    const author = session?.user?.id as number;
    const jwt = session?.jwt as string;
    const { images, content } = getValues();
    mutate({ author, jwt, product: productId, rating, images, content });
  };

  useEffect(() => {
    console.log("AddReviewModal 마운트");
    return () => {
      console.log("AddReviewModal 언마운트");
      reset();
    };
  }, []);

  return (
    <>
      <ModalContainer closeModal={handleClose}>
        {isLoading && <Spinner />}
        <Wrapper>
          <Title>리뷰 작성</Title>
          <StarRating rating={rating} readOnly={false} setRating={setRating} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="images">이미지 첨부</label>
              <input type="file" id="images" {...register("images")} />
            </div>
            <div>
              <label htmlFor="content" className="sr-only">
                리뷰 내용
              </label>
              <Styled.ReviewContent
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
              disabled={!isValid || isLoading}
            >
              작성
            </Buttons.Custom>
          </form>
          <CloseButton onClick={handleClose}>
            <CloseIcon width={18} height={18} />
            <span className="sr-only">리뷰 작성창 닫기</span>
          </CloseButton>
        </Wrapper>
      </ModalContainer>
      {alertModal.modal.isOpen && (
        <AlertModal modalId="alertModal" onClose={handleClose} />
      )}
    </>
  );
};

export default AddReviewModal;
