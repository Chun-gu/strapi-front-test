import { COLOR } from "@shared/constants";
import styled from "styled-components";

export const List = styled.ul`
  min-height: 31.8rem;
  font-size: 1.6rem;
  line-height: 1.3;
  margin-bottom: 4rem;
  li {
    display: grid;
    grid-template-columns: 1fr 7fr 1fr 1fr;
    gap: 1rem;
    min-height: 5.3rem;
    padding: 1.5rem 0;
    text-align: center;
  }
  li:first-child {
    border-bottom: 1px solid ${COLOR.black};
  }
`;
