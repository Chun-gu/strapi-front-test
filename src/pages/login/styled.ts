import styled from "styled-components";
import { COLOR } from "@styles/color";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 10rem);
  margin-top: 10rem;
`;
export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 8px;
  width: 55rem;
  height: 28rem;
  margin-top: 5rem;
  & > div {
    width: 48rem;
    margin-bottom: 3rem;
  }
`;

export const UL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 70rem;
  margin-top: 2.9rem;
  font-size: 1.5rem;
  & li {
    cursor: pointer;
  }
  & li + li::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1.3rem;
    vertical-align: -0.1rem;
    border-radius: 0.05rem;
    background-color: ${COLOR.black};
    margin-right: 0.5rem;
  }
`;

export const ErrorMsg = styled.p`
  width: 48rem;
  color: ${COLOR.red};
  font-size: 1.2rem;
  margin-top: 0.3rem;
`;
