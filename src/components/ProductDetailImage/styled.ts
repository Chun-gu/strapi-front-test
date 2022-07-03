import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Wrapper = styled.div<{ isOpen: boolean }>`
  position: relative;
  & > span {
    position: unset !important;
    & > img {
      height: auto !important;
      position: relative !important;
      object-fit: contain !important;
    }
  }
  ${({ isOpen }) =>
    !isOpen &&
    `height: 60rem;
    overflow: hidden;`}
  padding-bottom: 2rem;
`;

export const ViewMore = styled.div<{ isOpen: boolean }>`
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100%;
    ${({ isOpen }) =>
      !isOpen &&
      `height: 12rem;
      margin-top: -12rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);`}
  }
`;

export const ViewMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43rem;
  height: 7rem;
  background-color: ${COLOR.white};
  color: ${COLOR.accentColor};
  border: 1px solid ${COLOR.accentColor};
  margin: 0 auto;
  svg {
    path {
      stroke: ${COLOR.accentColor};
    }
  }
`;
