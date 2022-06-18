import styled, { keyframes } from "styled-components";
import { COLOR } from "@styles/color";

const loadingAnimation = (width: number) => keyframes`
  0% {
    transform: translateX(-${width}rem);
  }
  50%,
  100% {
    transform: translateX(${width}rem);
  }
`;

export const Loader = styled.div<{ width: number }>`
  background-color: ${COLOR.greyE0};
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    background: linear-gradient(
      to right,
      ${COLOR.greyE0},
      ${COLOR.white},
      ${COLOR.greyE0}
    );
    animation: ${({ width }) => loadingAnimation(width)} 2s infinite linear;
  }
`;
