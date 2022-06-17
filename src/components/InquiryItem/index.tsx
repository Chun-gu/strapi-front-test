import { useState } from "react";
import { useSession } from "next-auth/react";
import { IInquiry } from "@types";
import { dateConverter } from "@utils/dateConverter";
import { Answer } from "@components";
import * as Buttons from "../Buttons";
import * as Styled from "./styled";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addAnswer } from "@api";
import { useRouter } from "next/router";

export function InquiryItem({ ...inquiry }: IInquiry) {
  const { data: session } = useSession();
  const isSeller = session?.user?.isSeller;

  const router = useRouter();
  const { productId } = router.query;

  const { id, content, author, answer, createdAt } = inquiry;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addAnswer, {
    onSuccess: () => {
      alert("답변 작성 성공");
      queryClient.invalidateQueries(["getInquiries", productId]);
      reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const { reset, register, getValues, handleSubmit } = useForm<{
    content: string;
  }>({ mode: "onChange" });

  const onSubmit = () => {
    const { content } = getValues();

    if (session) {
      const jwt = session.jwt as string;
      mutate({ jwt, content, inquiry: id });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(() => !isOpen);
  };

  return (
    <Styled.Inquiry>
      <span>{answer ? "답변완료" : "답변대기"}</span>
      <Styled.InquiryContent
        onClick={toggleOpen}
        isOpen={isOpen}
        isAnswered={!!answer}
      >
        {content}
      </Styled.InquiryContent>
      <span className="ellipsis-single">{author.username}</span>
      <span>{dateConverter(createdAt)}</span>
      {/* {isOpen && <Answer answerId={answer?.id} />} */}
      {isOpen && !!answer && (
        <Styled.Answer>
          <Styled.AnswerContent>
            <>
              <Styled.Badge>답변</Styled.Badge>
              <span>{answer.content}</span>
            </>
          </Styled.AnswerContent>
          <span>판매자</span>
          <span>{dateConverter(createdAt)}</span>
        </Styled.Answer>
      )}
      {isOpen && !!isSeller && !answer && (
        <Styled.Answer>
          <Styled.AnswerForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.AnswerInput
              type="text"
              placeholder="답변 작성"
              {...register("content")}
            />
            <Buttons.Custom
              width={7}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={false}
            >
              작성
            </Buttons.Custom>
          </Styled.AnswerForm>
        </Styled.Answer>
      )}
    </Styled.Inquiry>
  );
}
