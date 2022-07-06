import { COLOR } from "@styles/color";
import styled from "styled-components";

export const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  line-height: 1.3;
  padding: 1rem 3rem;
  border-bottom: 0.1rem solid ${COLOR.greyC4};
`;

export const Author = styled.div`
  display: flex;
  /* margin-right: 2rem; */
  div {
    margin-right: 1rem;
  }
  span {
    display: block;
    width: 8rem;
    padding: 1.1rem 0;
  }
`;

export const Content = styled.p`
  width: 60rem;
  line-height: 1;
  padding: 1.1rem 0;
  overflow-wrap: break-word;
`;

export const Input = styled.input`
  width: 60rem;
  height: 4rem;
  font-size: 1.6rem;
  padding: 0 1rem;
  border: 1px solid ${COLOR.greyC4};
`;

export const DateAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8.4rem;
`;

export const Date = styled.span`
  color: ${COLOR.grey76};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
