import styled from "styled-components";
import { Loader } from "../styled";
import { COLOR } from "@styles/color";

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${COLOR.greyC4};
`;

export const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 128rem;
  height: 12.2rem;
  padding: 2rem 6rem;
  border-bottom: 1px solid ${COLOR.greyC4};
`;

export const Author = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 8rem;
`;

export const Content = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 8rem;
`;

export const Image = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 8rem;
`;

export const Pagination = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 1.8rem;
  margin-top: 4rem;
`;
