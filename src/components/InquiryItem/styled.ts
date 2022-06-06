import { COLOR } from '@styles/color';
import styled from 'styled-components';

export const Inquiry = styled.li`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  text-align: center;
  color: ${COLOR.grey76};
  padding: 1.5rem 0;
  border-bottom: 1px solid ${COLOR.greyC4};
`;

export const InquiryContent = styled.p<{
  isOpen: boolean;
  isAnswered: boolean;
}>`
  text-align: start;
  ${({ isAnswered }) => isAnswered && `cursor: pointer;`}
  ${({ isOpen }) =>
    isOpen
      ? undefined
      : `overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;`}
`;

export const Answer = styled.div`
  grid-column: 2/5;
  display: flex;
  padding-top: 1.5rem;
  border-top: 1px solid ${COLOR.greyC4};
  & > span {
    display: inline-block;
    width: 12.5rem;
    height: 100%;
    margin-left: 1rem;
  }
`;

export const AnswerContent = styled.p`
  display: inline-block;
  width: 87.5rem;
  text-align: start;
`;

export const Badge = styled.span`
  display: inline-block;
  height: 2.3rem;
  line-height: 2.3rem;
  color: ${COLOR.white};
  background-color: ${COLOR.accentColor};
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`;

export const AnswerForm = styled.form`
  button {
    vertical-align: top;
  }
`;

export const AnswerInput = styled.input`
  width: 87.5rem;
  height: 100%;
  font-size: 1.6rem;
  padding-left: 1rem;
  border: 1px solid ${COLOR.greyC4};
  margin-right: 4rem;
`;
