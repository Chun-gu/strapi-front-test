import styled from "styled-components";
import { COLOR } from "@styles/color";

export const ReviewSection = styled.div`
  position: relative;
  min-height: 66.4rem;
`;

export const ReviewList = styled.ul`
  min-height: 60.6rem;
  margin-bottom: 4rem;
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
