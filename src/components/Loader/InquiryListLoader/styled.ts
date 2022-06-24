import { COLOR } from "@styles/color";
import styled from "styled-components";
import { Loader } from "../styled";

export const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InquiryItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 128rem;
  height: 5.3rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${COLOR.greyC4};
  &:first-child {
    border-bottom: 1px solid ${COLOR.black};
  }
`;

export const content = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 2.2rem;
`;

export const Pagination = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 1.8rem;
  margin-top: 4rem;
`;
