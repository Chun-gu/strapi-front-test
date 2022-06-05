import { addComment } from "@api";
import { IAddCommentValues } from "src/types";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const AddComment: NextPage = () => {
  const { data: session } = useSession();

  const { register, handleSubmit } = useForm<IAddCommentValues>();

  const onSubmit = async (values: IAddCommentValues) => {
    if (!session) {
      alert("로그인이 필요합니다.");
      return;
    } else if (session) {
      const author = session.user!.id;
      const jwt = session.jwt as string;
      try {
        const data = await addComment(jwt, author, values);
        if (data) alert("댓글 등록 성공");
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = (error.response.data as { error: Error }).error
            .message;
          alert(`리뷰 등록 실패 \n ${errorMessage}`);
        } else {
          alert("등록 도중에 오류 발생");
        }
      }
    }
  };

  return (
    <>
      <h1>댓글 등록</h1>
      <h2>현재 회원: {session ? session.user?.username : "로그인 필요"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="review">타겟 리뷰 id</label>
          <input type="text" id="review" {...register("review")} />
        </div>
        <div>
          <label htmlFor="content">댓글 내용</label>
          <input type="text" id="content" {...register("content")} />
        </div>
        <button type="submit">댓글 등록</button>
      </form>
    </>
  );
};

export default AddComment;
