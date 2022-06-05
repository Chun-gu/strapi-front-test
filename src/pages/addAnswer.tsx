import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { addAnswer } from "@api";
import { IAddAnswerValues } from "src/types";
import axios from "axios";

const AddAnswer = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<IAddAnswerValues>();

  const onSubmit = async (values: IAddAnswerValues) => {
    if (!session) {
      alert("관리자 로그인이 필요합니다.");
      return;
    }

    const { inquiryId, answer } = values;
    const jwt = session.jwt as string;

    try {
      const data = await addAnswer(jwt, inquiryId, answer);
      if (data) alert("답변 등록 성공");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error
          .message;
        alert(`리뷰 등록 실패 \n ${errorMessage}`);
      } else {
        alert("등록 도중에 오류 발생");
      }
    }
  };

  return (
    <>
      <h1>답변 등록</h1>
      <h2>관리자만 답변을 등록할 수 있습니다.</h2>
      <p>
        {session?.user?.isSeller
          ? "답변등록 가능"
          : "관리자 계정으로 로그인해주세요."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="inquiryId">답변 대상 문의 id</label>
          <input type="text" id="inquiryId" {...register("inquiryId")} />
        </div>
        <div>
          <label htmlFor="answer">답변 내용</label>
          <input type="text" id="answer" {...register("answer")} />
        </div>
        <button type="submit">답변 등록</button>
      </form>
    </>
  );
};

export default AddAnswer;
