import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ICommentResponse } from "@types";
import { addComment, getComments } from "@api";
import ImageWrapper from "@utils/ImageWrapper";
import CommentItem from "../CommentItem";
import * as Buttons from "../Buttons";
import { Pagination } from "../Pagination";
import * as Styled from "./styled";

interface ICommentListProps {
  reviewId: number;
}

export function CommentList({ reviewId }: ICommentListProps) {
  const { data: session } = useSession();
  const { isLoading, data: commentsData } = useQuery<ICommentResponse>(
    ["getComments", reviewId],
    () => getComments(reviewId),
  );

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ content: string }>({ mode: "onChange" });

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      alert("댓글 작성 성공!");
      queryClient.invalidateQueries(["getComments", reviewId]);
      reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmit = async () => {
    const { content } = getValues();

    if (session) {
      const author = session.user?.id as number;
      const jwt = session.jwt as string;
      mutate({ review: reviewId, author, jwt, content });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <Styled.CommentSection>
      {commentsData && commentsData.comments.length > 0 && (
        <>
          <ul>
            {commentsData.comments
              .slice(offset, offset + itemsPerPage)
              .map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
          </ul>
          {commentsData.comments.length > itemsPerPage && (
            <Styled.PaginationWrapper>
              <Pagination
                totalItemCount={commentsData.comments.length}
                itemsPerPage={itemsPerPage}
                pageNum={pageNum}
                setPageNum={setPageNum}
              />
            </Styled.PaginationWrapper>
          )}
        </>
      )}
      <Styled.CommentInputForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.Author>
          <ImageWrapper width={4} height={4} borderRadius="50%">
            <Image
              src="/images/seller-profileIMG.png"
              layout="fill"
              alt="작성자 사진"
            />
          </ImageWrapper>
          <span className="ellipsis-single">
            {session ? session.user?.username : "로그인 필요"}
          </span>
        </Styled.Author>
        <Styled.CommentInput htmlFor="content">
          <span className="sr-only">댓글 입력창</span>
          <input
            type="text"
            id="content"
            maxLength={100}
            placeholder="댓글을 입력하세요(10자 이상, 공백 불가)"
            {...register("content", {
              required: true,
              minLength: 10,
              pattern: /[^\s]/,
            })}
          />
        </Styled.CommentInput>
        <Buttons.Custom
          width={7}
          height={3}
          fontSize={1.4}
          color="green"
          disabled={!isValid}
        >
          작성
        </Buttons.Custom>
      </Styled.CommentInputForm>
    </Styled.CommentSection>
  );
}
