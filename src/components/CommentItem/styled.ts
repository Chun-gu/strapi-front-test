import { COLOR } from "@styles/color";
import styled from "styled-components";

export const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  line-height: 1.3;
  padding: 1rem 3rem;
  border-bottom: 0.1rem solid ${COLOR.greyC4};
`;

export const Author = styled.div`
  display: flex;
  margin-right: 2rem;
  div {
    margin-right: 1rem;
  }
  span {
    display: block;
    width: 8rem;
    margin-top: 1.2rem;
  }
`;

export const Content = styled.p`
  width: 60rem;
  margin-top: 1.4rem;
`;

export const Date = styled.span`
  color: ${COLOR.grey76};
  margin-top: 1.4rem;
`;
