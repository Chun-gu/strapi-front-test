import styled from 'styled-components';
import { COLOR } from '@styles/color';
import User from '/public/images/icon-user.svg';

export const Container = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5.6rem;
  &:hover {
    svg {
      path {
        stroke: ${COLOR.accentColor};
      }
    }
  }
`;

export const UserIcon = styled(User)`
  width: 3.2rem;
  height: 3.2rem;
  path {
    stroke: ${COLOR.black};
  }
`;

export const Username = styled.span`
  width: 100%;
  vertical-align: top;
`;

export const LoginLink = styled.a`
  width: 5.6rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &:hover {
    svg {
      path {
        stroke: ${COLOR.accentColor};
      }
    }
  }
`;

export const List = styled.ul`
  text-align: center;
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
  li:first-child {
    margin-bottom: 0.3rem;
  }
`;
