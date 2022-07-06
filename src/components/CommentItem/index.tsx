import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { deleteComment, updateComment } from "@api";
import { Buttons } from "@components";
import { useModal } from "@hooks";
import { IComment } from "@types";
import { ImageWrapper, dateConverter } from "@utils";
import authorImg from "public/assets/images/img-user-fallback.png";
import * as Styled from "./styled";

interface Props {
  comment: IComment;
  reviewId: number;
}

const CommentItem = ({ reviewId, comment }: Props) => {
  const { id: commentId, author, content, createdAt } = comment;
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === author.id;
  const jwt = session?.jwt as string;

  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const deleteConfirmModal = useModal({
    modalId: "deleteConfirm",
    onSubmit: () => mutate({ comment: commentId, jwt }),
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

  const onClickCancel = () => {
    reset();
    setIsEditing(false);
  };

  const queryClient = useQueryClient();
  const { mutate: update } = useMutation(updateComment, {
    onSuccess: () => {
      updateDoneModal.open();
      queryClient.invalidateQueries(["getComments"]);
      setIsEditing(false);
    },
    onError: () => {
      errorModal.open();
    },
  });

  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => {
      deleteDoneModal.open();
      queryClient.invalidateQueries(["getComments"]);
    },
    onError: () => {
      errorModal.open();
    },
  });

  const onSubmit = async () => {
    const { content } = getValues();
    const author = session?.user?.id as number;
    update({ review: reviewId, author, jwt, content, comment: commentId });
  };

  const onClickDelete = () => {
    deleteConfirmModal.open();
  };

  return (
    <Styled.CommentItem
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Styled.Author>
        <ImageWrapper width={4} height={4} borderRadius="50%">
          <Image
            src={authorImg}
            layout="fill"
            objectFit="cover"
            alt="작성자 프로필 이미지"
          />
        </ImageWrapper>
        <span>{author.username}</span>
      </Styled.Author>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Input
            autoFocus
            type="text"
            id="content"
            maxLength={100}
            placeholder="댓글을 입력하세요(10자 ~ 100자, 공백 불가)"
            {...register("content", {
              required: true,
              minLength: 10,
              maxLength: 100,
              pattern: /[^\s]/,
            })}
          />
        </form>
      ) : (
        <Styled.Content>{content}</Styled.Content>
      )}
      <Styled.DateAndButtons>
        {(!isAuthor || (!isHover && !isEditing)) && (
          <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
        )}
        {isAuthor && isHover && !isEditing && (
          <Styled.ButtonsWrapper>
            <Buttons.Custom
              width={4}
              height={3}
              color="green"
              fontSize={1.4}
              disabled={false}
              onClick={() => setIsEditing(true)}
            >
              수정
            </Buttons.Custom>
            <Buttons.Custom
              width={4}
              height={3}
              color="red"
              fontSize={1.4}
              disabled={false}
              onClick={onClickDelete}
            >
              삭제
            </Buttons.Custom>
          </Styled.ButtonsWrapper>
        )}
        {isAuthor && isEditing && (
          <Styled.ButtonsWrapper>
            <Buttons.Custom
              width={4}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              작성
            </Buttons.Custom>
            <Buttons.Custom
              width={4}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={false}
              onClick={onClickCancel}
            >
              취소
            </Buttons.Custom>
          </Styled.ButtonsWrapper>
        )}
      </Styled.DateAndButtons>
    </Styled.CommentItem>
  );
};

export default CommentItem;
