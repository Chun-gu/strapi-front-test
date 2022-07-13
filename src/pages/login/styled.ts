import styled from "styled-components";
import { COLOR } from "@styles/color";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

export const LoginForm = styled.form`
  width: 37.5rem;
  padding: 2rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 1rem;
  margin-bottom: 3rem;
`;

export const InputWrapper = styled.div`
  padding-bottom: 2rem;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${COLOR.greyC4};
  &:focus {
    border-color: ${COLOR.accentColor};
  }
`;

export const VisibilityButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0.7rem;
  right: 0;
  & > svg {
    stroke: ${COLOR.greyC4};
  }
  &:hover > svg {
    stroke: black;
  }
`;

export const Links = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  & li + li::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1.6rem;
    vertical-align: bottom;
    background-color: ${COLOR.black};
    margin-right: 0.5rem;
  }
`;

export const ErrorMsg = styled.p`
  display: block;
  font-size: 1.4rem;
  color: ${COLOR.red};
  position: absolute;
  bottom: 0;
`;
