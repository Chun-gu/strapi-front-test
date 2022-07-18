import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

export const JoinForm = styled.form`
  width: 37.5rem;
  padding: 3rem 2rem 2rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 1rem;
  margin-bottom: 3rem;
`;

export const InputWrapper = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const Input = styled.input<{ isValid?: boolean }>`
  font-size: 1.6rem;
  padding: 1rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 0.5rem;
  &:focus {
    border-color: ${({ isValid }) => (isValid ? COLOR.accentColor : COLOR.red)};
  }
`;

export const UsernameInput = styled(Input)`
  width: calc(100% - 11rem);
  margin-right: 1rem;
`;

export const UsernameButtonWrapper = styled.div`
  display: inline-block;
  width: 10rem;
  height: 4.3rem;
  position: relative;
`;

export const ValidUsernameMessage = styled.p`
  display: block;
  font-size: 1.4rem;
  color: ${COLOR.accentColor};
  position: absolute;
  bottom: 0;
`;

export const PasswordInput = styled(Input)`
  width: 100%;
`;

export const VisibilityButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 3.5rem;
  right: 1rem;
  & > svg {
    stroke: ${COLOR.greyC4};
  }
  &:hover > svg {
    stroke: black;
  }
`;

export const EmailInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > input,
  & > div {
    width: 45%;
  }
`;

export const EmailInput = styled(Input)`
  /* width: 45%; */
`;

export const PhoneInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PhoneInput = styled(Input)`
  width: 30%;
`;

export const ErrorMsg = styled.p`
  display: block;
  font-size: 1.4rem;
  color: ${COLOR.red};
  position: absolute;
  bottom: 0;
`;

export const SubmitButtonWrapper = styled.div`
  width: 33.3rem;
  height: 6rem;
  position: relative;
`;
