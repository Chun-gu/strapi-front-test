import styled from "styled-components";
import { COLOR } from "@styles/color";

export const ModalContent = styled.div`
  padding: 1rem 2rem;
`;

export const ReviewContent = styled.textarea`
  width: 100%;
  height: 15rem;
  font-size: 1.6rem;
  border: 1px solid ${COLOR.black};
  margin: 1rem 0;
  resize: none;
`;
