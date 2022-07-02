import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { postAnswer } from "@api";
import { IInquiry } from "@types";
import { dateConverter } from "@utils";
import * as Buttons from "../Buttons";
import * as Styled from "./styled";

const InquiryItem = ({ ...inquiry }: IInquiry) => {
  const { data: session } = useSession();
  const isSeller = session?.user?.isSeller;

  const { id, content, author, answer, createdAt } = inquiry;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(postAnswer, {
    onSuccess: () => {
      alert("답변 작성 성공");
      queryClient.invalidateQueries(["getInquiries"]);
      reset();
    },
    onError: (error) => {
      alert(error);
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
