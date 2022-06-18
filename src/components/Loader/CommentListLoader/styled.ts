import styled from "styled-components";
import { COLOR } from "@styles/color";
import { Loader } from "../styled";

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${COLOR.greyC4};
  margin: 2rem 0 4rem 0;
`;

export const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95rem;
  height: 6rem;
  padding: 1rem 3rem;
  border-bottom: 1px solid ${COLOR.greyC4};
`;

export const Pagination = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 1.8rem;
  margin-top: 1rem;
`;

export const Author = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 4rem;
`;

export const Content = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 4rem;
`;

export const Data = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 4rem;
`;
