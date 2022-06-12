import styled, { keyframes } from 'styled-components';
import { COLOR } from '@styles/color';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 38rem);
  justify-content: space-around;
  gap: 3rem;
`;

const loading = keyframes`
  0% {
    transform: translateX(-38rem);
  }
  50%,
  100% {
    transform: translateX(38rem);
  }
`;

const Loader = styled.div`
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    background: linear-gradient(
      to right,
      ${COLOR.greyE0},
      ${COLOR.white},
      ${COLOR.greyE0}
    );
    animation: ${loading} 2s infinite linear;
  }
`;

export const Image = styled(Loader)`
  width: 38rem;
  height: 38rem;
  background-color: ${COLOR.greyE0};
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const Name = styled(Loader)`
  width: 15rem;
  height: 2.2rem;
  background-color: ${COLOR.greyE0};
  margin-bottom: 0.5rem;
`;

export const Price = styled(Loader)`
  width: 24rem;
  height: 2.4rem;
  background-color: ${COLOR.greyE0};
`;
