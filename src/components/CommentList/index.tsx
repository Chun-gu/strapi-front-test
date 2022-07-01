import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { addComment, getComments } from "@api";
import { IApiResponse, IComment } from "@types";
import { ImageWrapper } from "@utils";
import * as Buttons from "../Buttons";
import CommentItem from "../CommentItem";
import { CommentListLoader } from "../Loader";
import Pagination from "../Pagination";
import authorImg from "public/assets/images/img-user-fallback.png";
import * as Styled from "./styled";

interface ICommentListProps {
  reviewId: number;
}

const CommentList = ({ reviewId }: ICommentListProps) => {
  const { data: session } = useSession();

  const [page, setPage] = useState(1);
  const limit = 5;

  const { isLoading, data: comments } = useQuery<IApiResponse<IComment[]>>(
    ["getComments", { reviewId, page }],
    () => getComments(reviewId, limit, page),
    { keepPreviousData: true },
  );

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ content: string }>({ mode: "onChange" });

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      alert("댓글 작성 성공!");
      queryClient.invalidateQueries(["getComments"]);
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
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  if (isLoading) return <CommentListLoader />;

  return (
    <Styled.CommentSection>
      {comments && comments.data.length > 0 && (
        <>
          <ul>
            {comments.data.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </ul>
          {comments.pagination.total > limit && (
            <Styled.PaginationWrapper>
              <Pagination
                totalPageCount={comments.pagination.pageCount}
                page={page}
                setPage={setPage}
              />
            </Styled.PaginationWrapper>
          )}
        </>
      )}
      <Styled.CommentInputForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.Author>
          <ImageWrapper width={4} height={4} borderRadius="50%">
            <Image src={authorImg} layout="fill" alt="작성자 사진" />
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
};

export default CommentList;
