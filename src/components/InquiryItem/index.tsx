import { useEffect, useState } from 'react';
import { IInquiry, IUser } from '@shared/types';
import { dateConverter } from '@utils/dateConverter';
import * as Buttons from '../Buttons';
import * as Styled from './styled';

export function InquiryItem({
  content,
  answer,
  createdAt,
  updatedAt
}: IInquiry) {
  const isSeller = false;
  const isAnswered = !!answer;
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<IUser>();
  const toggleOpen = () => {
    setIsOpen(() => !isOpen);
  };
  const getData = async () => {
    const { data } = await api.get(`/user/${userId}`);
    setUserData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Styled.Inquiry>
      <span>{isAnswered ? '답변완료' : '답변대기'}</span>
      <Styled.InquiryContent
        onClick={toggleOpen}
        isOpen={isOpen}
        isAnswered={isAnswered}
      >
        {content}
      </Styled.InquiryContent>
      <span className="ellipsis-single">{userData?.userName}</span>
      <span>{dateConverter(createdAt)}</span>
      {isOpen && isAnswered && (
        <Styled.Answer>
          <Styled.AnswerContent>
            <Styled.Badge>답변</Styled.Badge>
            {answer}
          </Styled.AnswerContent>
          <span>판매자</span>
          <span>{dateConverter(updatedAt)}</span>
        </Styled.Answer>
      )}
      {isOpen && isSeller && !isAnswered && (
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
    </Styled.Inquiry>
  );
}
