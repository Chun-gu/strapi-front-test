import { COLOR } from "@shared/constants";
import styled from "styled-components";

export const ProductImage = styled.div``;

export const ImageSlider = styled.div`
  object-fit: cover;
  margin-bottom: 1.5rem;
  position: relative;
  &:hover button {
    visibility: visible;
  }
`;

export const PrevButton = styled.button`
  width: 6rem;
  height: 7rem;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  & > svg {
    vertical-align: top;
  }
`;
export const NextButton = styled(PrevButton)`
  right: 0;
`;

export const Thumbnails = styled.div`
  width: 39rem;
  display: flex;
  gap: 1rem;
  & > button:hover {
    outline: 2px solid ${COLOR.accentColor};
  }
`;
