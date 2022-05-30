import { IAddReviewValues } from "@types";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { addReview } from "@api";
import axios from "axios";
import { useSession } from "next-auth/react";

const AddReview: NextPage = () => {
  const { data: session } = useSession();
  console.log("session by useSession", session);
  const { register, handleSubmit } = useForm<IAddReviewValues>();

  const onSubmit = async (values: IAddReviewValues) => {
    if (!session) alert("로그인이 필요합니다");
    else if (session) {
      console.log("리뷰정보", values);
      const author = session.user!.id;
      const jwt = session.jwt as string;
      try {
        const data = await addReview(jwt, author, values);
        if (data) alert("리뷰 등록 성공");
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
      <h1>리뷰 작성</h1>
      <h2>현재 회원: {session?.user?.username}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="product">타겟 제품 id</label>
          <input type="text" id="product" {...register("product")} />
        </div>
        <div>
          <label htmlFor="rating">별점(1~5)</label>
          <input
            type="number"
            id="rating"
            min={1}
            max={5}
            value={1}
            {...register("rating")}
          />
        </div>
        <div>
          <label htmlFor="content">리뷰 내용</label>
          <input
            type="text"
            id="content"
            minLength={10}
            maxLength={500}
            {...register("content")}
          />
        </div>
        <div>
          <label htmlFor="images">리뷰 이미지</label>
          <input type="file" id="images" {...register("images")} />
        </div>
        <button type="submit">리뷰 등록</button>
      </form>
    </>
  );
};

export default AddReview;
