import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: Spoqa Han Sans, sans-serif;
  }
  
  html {
    font-size: 62.5%;
    font-family: Spoqa Han Sans, sans-serif;
  }

  body {
    font-size: 1.6rem;
  }

  button {
    font-size: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  button:disabled {
    cursor: default;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
  }
  input:focus {
    outline: none;
  }

  .sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0;
    clip: rect(0, 0, 0, 0);
  }

  .ellipsis-single {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ellipsis-double {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default GlobalStyle;

export const NoneYet = styled.p`
  font-size: 2.4rem;
  text-align: center;
`;
