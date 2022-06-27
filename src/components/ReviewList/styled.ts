import styled from "styled-components";
import { COLOR } from "@styles/color";

export const ReviewSection = styled.div`
  position: relative;
  min-height: 66.4rem;
  padding-bottom: 5.8rem;
`;

export const ReviewList = styled.ul`
  min-height: 60.6rem;
  border-top: 1px solid ${COLOR.greyC4};
  border-bottom: 1px solid ${COLOR.greyC4};
`;

export const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
`;

export const NoneYetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128rem;
  height: 60.6rem;
  border-top: 1px solid ${COLOR.greyC4};
  border-bottom: 1px solid ${COLOR.greyC4};
`;
