import styled from "styled-components";
import Cart from "public/assets/icons/icon-shopping-cart.svg";
import { COLOR } from "@styles/color";

export const Header = styled.header`
  font-size: 1.4rem;
  padding: 2.5rem 0;
  background-color: ${COLOR.white};
`;

export const Container = styled.div`
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartLink = styled.a`
  width: 5.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 0.5rem;
  &:hover {
    svg {
      path {
        stroke: ${COLOR.accentColor};
      }
    }
  }
`;

export const UserMenuWrapper = styled.div`
  display: flex;
`;

export const CartIcon = styled(Cart)`
  path {
    stroke: ${COLOR.black};
  }
`;
