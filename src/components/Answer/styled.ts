import { COLOR } from "@styles/color";
import styled from "styled-components";

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

export const DateAndButtons = styled.div`
  width: 12.5rem;
  height: 100%;
  margin-left: 1rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 8.4rem;
  margin: 0 auto;
`;

export const AnswerForm = styled.form`
  button {
    vertical-align: top;
    margin-right: 1rem;
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
