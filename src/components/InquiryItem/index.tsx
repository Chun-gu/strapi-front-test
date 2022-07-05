import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { deleteInquiry, postAnswer } from "@api";
import { useModal } from "@hooks";
import { IInquiry } from "@types";
import { dateConverter } from "@utils";
import Answer from "../Answer";
import * as Buttons from "../Buttons";
import * as Styled from "./styled";

const InquiryItem = ({ ...inquiry }: IInquiry) => {
  const { id, content, author, answer, createdAt } = inquiry;

  const { data: session } = useSession();
  const jwt = session?.jwt as string;
  const isSeller = session?.user?.isSeller;
  const isAuthor = session?.user?.id === author.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const updateInquiryModal = useModal({
    modalId: "updateInquiry",
    prevData: inquiry,
  });
  const deleteConfirmModal = useModal({
    modalId: "deleteConfirm",
    onSubmit: () => mutate({ inquiry: id, jwt }),
  });
  const postDoneModal = useModal({ modalId: "postDone" });
  const deleteDoneModal = useModal({ modalId: "deleteDone" });
  const errorModal = useModal({ modalId: "error" });

  const toggleOpen = () => {
    setIsOpen(() => !isOpen);
  };

  const onClickUpdate = () => {
    updateInquiryModal.open();
  };

  const onClickDelete = () => {
    deleteConfirmModal.open();
  };

  const queryClient = useQueryClient();
  const { mutate: post } = useMutation(postAnswer, {
    onSuccess: () => {
      postDoneModal.open();
      queryClient.invalidateQueries(["getInquiries"]);
      reset();
    },
    onError: () => {
      errorModal.open();
    },
  });

  const { mutate } = useMutation(deleteInquiry, {
    onSuccess: () => {
      deleteDoneModal.open();
      queryClient.invalidateQueries(["getInquiries"]);
    },
    onError: () => {
      errorModal.open();
    },
  });

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    content: string;
  }>({ mode: "onChange" });

  const onSubmit = () => {
    const { content } = getValues();
    if (session) {
      post({ jwt, content, inquiry: id });
    }
  };

  return (
    <Styled.Inquiry
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span>{answer ? "답변완료" : "답변대기"}</span>
      <Styled.InquiryContent
        onClick={toggleOpen}
        isOpen={isOpen}
        isAnswered={!!answer}
      >
        {content}
      </Styled.InquiryContent>
      <span className="ellipsis-single">{author.username}</span>
      <div>
        {isAuthor && isHover && (
          <Styled.ButtonsWrapper>
            {!answer && (
              <Buttons.Custom
                width={4}
                height={2}
                color="green"
                fontSize={1.4}
                disabled={false}
                onClick={onClickUpdate}
              >
                수정
              </Buttons.Custom>
            )}
            <Buttons.Custom
              width={4}
              height={2}
              color="red"
              fontSize={1.4}
              disabled={false}
              onClick={onClickDelete}
            >
              삭제
            </Buttons.Custom>
          </Styled.ButtonsWrapper>
        )}
        {(!isAuthor || !isHover) && <span>{dateConverter(createdAt)}</span>}
      </div>
      {isOpen && !!answer && <Answer {...answer} />}
      {isOpen && isSeller && !answer && (
        <Styled.Answer>
          <Styled.AnswerForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.AnswerInput
              type="text"
              placeholder="답변 작성"
              {...register("content", {
                required: true,
                minLength: 10,
              })}
            />
            <Buttons.Custom
              width={7}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={!isValid}
            >
              작성
            </Buttons.Custom>
          </Styled.AnswerForm>
        </Styled.Answer>
      )}
    </Styled.Inquiry>
  );
};

export default InquiryItem;
