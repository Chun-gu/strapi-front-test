import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { deleteAnswer, updateAnswer } from "@api";
import { useModal } from "@hooks";
import { IAnswer } from "@types";
import { dateConverter } from "@utils";
import * as Buttons from "../Buttons";
import * as Styled from "./styled";

const Answer = ({ id: answerId, content, createdAt }: IAnswer) => {
  const { data: session } = useSession();
  const isSeller = session?.user?.isSeller;
  const jwt = session?.jwt as string;

  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: update } = useMutation(updateAnswer, {
    onSuccess: () => {
      updateDoneModal.open();
      queryClient.invalidateQueries(["getInquiries"]);
      setIsEditing(false);
    },
    onError: () => {
      errorModal.open();
    },
  });

  const { mutate } = useMutation(deleteAnswer, {
    onSuccess: () => {
      deleteDoneModal.open();
      queryClient.invalidateQueries(["getInquiries"]);
    },
    onError: () => {
      errorModal.open();
    },
  });

  const deleteConfirmModal = useModal({
    modalId: "deleteConfirm",
    onSubmit: () => mutate({ answer: answerId, jwt }),
  });
  const updateDoneModal = useModal({ modalId: "updateDone" });
  const deleteDoneModal = useModal({ modalId: "deleteDone" });
  const errorModal = useModal({ modalId: "error" });

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ content: string }>({
    mode: "onChange",
    defaultValues: { content },
  });

  const onSubmit = async () => {
    const { content } = getValues();
    update({ jwt, content, answer: answerId });
  };

  const onClickUpdate = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    deleteConfirmModal.open();
  };

  const onClickCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing && (
        <Styled.Answer
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Styled.AnswerContent>
            <>
              <Styled.Badge>답변</Styled.Badge>
              {content}
            </>
          </Styled.AnswerContent>
          <span>판매자</span>
          <Styled.DateAndButtons>
            {isSeller && isHover && (
              <Styled.ButtonsWrapper>
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
            {(!isSeller || !isHover) && <span>{dateConverter(createdAt)}</span>}
          </Styled.DateAndButtons>
        </Styled.Answer>
      )}
      {!!isSeller && isEditing && (
        <Styled.Answer>
          <Styled.AnswerForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.AnswerInput
              autoFocus
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
              수정
            </Buttons.Custom>
            <Buttons.Custom
              width={7}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={false}
              onClick={onClickCancel}
            >
              취소
            </Buttons.Custom>
          </Styled.AnswerForm>
        </Styled.Answer>
      )}
    </>
  );
};

export default Answer;
