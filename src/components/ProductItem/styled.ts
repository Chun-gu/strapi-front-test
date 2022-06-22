import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Name = styled.span`
  display: block;
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin: 1rem 0 0.5rem;
`;

export const Price = styled.div`
  /* font-weight: 700;
  font-size: 2.4rem;
  line-height: 3.5rem;
  span {
    font-weight: 400;
    font-size: 1.8rem;
  } */
`;

export const CurrentPrice = styled.span`
  font-weight: 700;
  font-size: 2.4rem;
  margin-right: 0.5rem;
  span {
    font-weight: 400;
    font-size: 1.8rem;
  }
`;

export const OriginalPrice = styled.span`
  text-decoration-line: line-through;
  margin-right: 0.5rem;
`;

export const DiscountRate = styled.span`
  font-weight: 700;
  color: ${COLOR.accentColor};
`;
