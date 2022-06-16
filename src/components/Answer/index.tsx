import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getAnswer } from "@api";
import { dateConverter } from "@utils/dateConverter";
import * as Buttons from "../Buttons";
import * as Styled from "./styled";

const Answer = ({ answerId }: { answerId: number | undefined }) => {
  const { data: session } = useSession();
  const isSeller = session?.user?.isSeller;

  const { data: answer } = useQuery(["getAnswer", answerId], () =>
    getAnswer(answerId),
  );

  return (
    <>
      {!!answer && (
        <Styled.Answer>
          <Styled.AnswerContent>
            <>
              <Styled.Badge>답변</Styled.Badge>
              {answer.content}
            </>
          </Styled.AnswerContent>
          <span>판매자</span>
          <span>{dateConverter(answer.createdAt)}</span>
        </Styled.Answer>
      )}
      {!!isSeller && !!answer && (
        <Styled.Answer>
          <Styled.AnswerForm>
            <Styled.AnswerInput type="text" placeholder="답변 작성" />
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
    </>
  );
};

export default Answer;
