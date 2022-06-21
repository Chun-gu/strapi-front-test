import { COLOR } from "@shared/constants";
import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.4rem;
  border: 0.1rem solid ${COLOR.greyE0};
  margin: 0 0.4rem;
  &:hover {
    background-color: ${COLOR.accentColor};
    border: none;
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
    border: 0.1rem solid ${COLOR.greyE0};
  }
  svg {
    width: 0.5rem;
    height: 1.1rem;
    & > path {
      stroke: ${COLOR.black};
    }
  }
`;

export const PageButton = styled(Button)<{ isCurrentPage: boolean }>`
  border: none;
  margin: 0;
  &:hover {
    background-color: ${COLOR.lightGreen};
  }
  color: ${(props) =>
    props.isCurrentPage ? `${COLOR.accentColor}` : `${COLOR.black}`};
`;
