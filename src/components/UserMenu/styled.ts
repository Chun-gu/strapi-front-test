import { COLOR } from '@styles/color';
import styled from 'styled-components';

export const Container = styled.div``;

export const UserButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 5.6rem;
`;

export const Tooltip = styled.ul`
  position: absolute;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  font-size: 1.6rem;
  padding: 1rem 0.5rem;
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.greyF8};
  border-radius: 0.5rem;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
