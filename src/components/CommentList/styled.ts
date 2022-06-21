import styled from "styled-components";
import { COLOR } from "@styles/color";

export const CommentSection = styled.div`
  border-top: 0.1rem solid ${COLOR.greyC4};
  border-bottom: 0.1rem solid ${COLOR.greyC4};
  margin: 2rem 0 4rem 0;
  font-size: 1.4rem;
  & > ul {
    /* margin-bottom: 1rem; */
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 1rem;
`;

export const CommentInputForm = styled.form`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  & > div {
    margin-right: 1rem;
  }
  & > span {
    display: inline-block;
    width: 8rem;
  }
`;
export const CommentInput = styled.label`
  width: 60rem;
  height: 4rem;
  border: 0.1rem solid ${COLOR.greyC4};
  & > input {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    font-size: 1.4rem;
  }
`;
