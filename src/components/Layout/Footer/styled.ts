import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Footer = styled.footer`
  font-size: 1.4rem;
  background-color: ${COLOR.greyF2};
  padding: 6rem 0;
`;

export const Container = styled.section`
  max-width: 128rem;
  margin: 0 auto;
`;

export const UpperSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR.greyC4};
  padding-bottom: 2rem;
`;

export const LinkList = styled.ul`
  display: flex;
  li {
    height: 2rem;
    line-height: 2rem;
    &:not(:first-child) {
      padding-left: 1.4rem;
    }
    &:not(:last-child) {
      padding-right: 1.4rem;
      border-right: 1px solid ${COLOR.black};
    }
  }
`;

export const SocialList = styled.ul`
  display: flex;
  gap: 1.4rem;
`;

export const LowerSection = styled.div`
  color: ${COLOR.grey51};
  line-height: 1.5;
  padding-top: 3rem;
  dl div {
    display: flex;
  }
`;

export const CompanyName = styled.dd`
  font-weight: 700;
`;
