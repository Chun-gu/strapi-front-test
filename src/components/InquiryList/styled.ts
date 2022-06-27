import { COLOR } from "@shared/constants";
import styled from "styled-components";

export const InquirySection = styled.div`
  min-height: 37.6rem;
  font-size: 1.6rem;
  line-height: 1.3;
  text-align: center;
  position: relative;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  gap: 1rem;
  height: 5.3rem;
  padding: 1.5rem 0;
  text-align: center;
  border-bottom: 1px solid ${COLOR.black};
`;

export const List = styled.ul`
  min-height: 26.5rem;
  margin-bottom: 4rem;
  li {
    display: grid;
    grid-template-columns: 1fr 7fr 1fr 1fr;
    gap: 1rem;
    min-height: 5.3rem;
    padding: 1.5rem 0;
    text-align: center;
  }
`;

export const NoneYetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26.5rem;
  border-bottom: 1px solid ${COLOR.greyC4};
`;
