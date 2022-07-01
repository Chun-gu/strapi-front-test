import styled from "styled-components";
import { Loader } from "../styled";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 38rem);
  justify-content: space-around;
  gap: 3rem;
`;

export const Image = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 38rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const Name = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 2.2rem;
  margin-bottom: 0.5rem;
`;

export const Price = styled(Loader)<{ width: number }>`
  width: ${({ width }) => width}rem;
  height: 2.4rem;
`;
