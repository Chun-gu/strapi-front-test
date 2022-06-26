import styled from "styled-components";
import { COLOR } from "@styles/color";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9997;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

export const Inner = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 9999;
  background-color: ${COLOR.white};
`;
