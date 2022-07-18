import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Label = styled.label<{ isValid: boolean }>`
  display: inline-flex;
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 0.5rem;
  &:focus-within {
    border-color: ${({ isValid }) => (isValid ? COLOR.accentColor : COLOR.red)};
  }
`;

export const Input = styled.input`
  width: calc(100% - 2rem);
  font-size: 1.6rem;
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  svg {
    path {
      stroke: ${COLOR.black};
    }
  }
`;

export const DomainList = styled.ul`
  width: 100%;
  background-color: ${COLOR.white};
  padding: 1rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 0.5rem;
  position: absolute;
  top: 5rem;
  z-index: 10;
  & > li {
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-align: center;
    line-height: 1.5;
  }
  & > li:hover,
  & > li:focus {
    background-color: ${COLOR.accentColor};
    color: ${COLOR.white};
  }
`;
