import { COLOR } from "@styles/color";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const BackGround = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Spinner = styled.div<{ size?: number }>`
  width: ${({ size }) => size || 5}rem;
  height: ${({ size }) => size || 5}rem;
  border: 5px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  border-top-color: ${COLOR.accentColor};
  animation: ${spin} 1s linear infinite;
`;
