import styled from "styled-components";
import { COLOR } from "@styles/color";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  min-width: 1.8rem;
  height: 1.8rem;
  font-size: 1.4rem;
  line-height: 1.8rem;
  outline: 1px solid ${COLOR.greyE0};
  padding: 0 0.2rem;
  margin: 0 0.4rem;
  &:hover {
    background-color: ${COLOR.accentColor};
    outline: 1px solid ${COLOR.accentColor};
    svg > path {
      stroke: ${COLOR.white};
    }
  }
  &[disabled] {
    svg > path {
      stroke: ${COLOR.greyE0};
    }
  }
  &[disabled]:hover {
    background-color: transparent;
    outline: 1px solid ${COLOR.greyE0};
  }
  svg {
    & > path {
      stroke: ${COLOR.black};
    }
  }
`;

export const PageButton = styled(Button)<{ isCurrentPage: boolean }>`
  outline: none;
  margin: 0 0.1rem;
  &:hover {
    background-color: ${COLOR.lightGreen};
  }
  color: ${(props) =>
    props.isCurrentPage ? `${COLOR.accentColor}` : `${COLOR.black}`};
`;
