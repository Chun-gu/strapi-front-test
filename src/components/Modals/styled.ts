import styled from "styled-components";
import { COLOR } from "@styles/color";

export const Wrapper = styled.div`
  min-width: 40rem;
  padding: 2rem;
`;

export const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.greyC4};
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 10rem;
  font-size: 1.6rem;
  border: 1px solid ${COLOR.greyC4};
  margin: 1rem 0;
  resize: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  svg {
    path {
      stroke: ${COLOR.greyC4};
    }
    &:hover {
      path {
        stroke: ${COLOR.black};
      }
    }
  }
`;
