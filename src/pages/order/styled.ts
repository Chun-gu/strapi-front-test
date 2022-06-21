import { COLOR } from "@styles/color";
import styled from "styled-components";

export const Container = styled.main`
  width: 128rem;
  font-size: 1.6rem;
  padding: 5.4rem 0;
  margin: 0 auto;
  header {
    font-size: 4.6rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 5.2rem;
  }
`;

export const OrderList = styled.ul`
  li {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: center;
    text-align: center;
  }
`;

export const Field = styled.li`
  height: 6rem;
  font-size: 1.8rem;
  background-color: ${COLOR.greyF2};
  border-radius: 1rem;
`;

export const Product = styled.li`
  height: 14.5rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${COLOR.greyC4};
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  div:first-child {
    margin-right: 3.6rem;
  }
  p {
    margin-bottom: 1rem;
  }
  span {
    font-size: 1.4rem;
    color: ${COLOR.grey76};
  }
`;

export const TotalPrice = styled.div`
  font-size: 1.8rem;
  text-align: end;
  margin-top: 3.3rem;
  span {
    font-size: 2.4rem;
    font-weight: 700;
    color: ${COLOR.red};
    margin-left: 0.9rem;
  }
`;

export const Form = styled.form`
  overflow: hidden;
  h2 {
    font-size: 2.4rem;
    line-height: 3.4rem;
    font-weight: 500;
    padding-bottom: 1.5rem;
    margin-top: 7rem;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.6rem;
    border-bottom: 2px solid ${COLOR.greyC4};
    margin-top: 3.8rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 5.6rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid ${COLOR.greyC4};
  label {
    display: inline-block;
    width: 17rem;
    height: 100%;
  }
`;

export const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35rem;
`;

export const Shipment = styled.section`
  h2 {
    font-size: 2.4rem;
    line-height: 3.4rem;
    font-weight: 500;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid ${COLOR.greyC4};
    margin-top: 7rem;
  }
`;

export const Input = styled.input`
  height: 4rem;
  font-size: 1.6rem;
  padding-left: 1rem;
  border: 1px solid ${COLOR.greyC4};
`;
export const SInput = styled(Input)`
  width: 10rem;
`;
export const MInput = styled(Input)`
  width: 35rem;
`;
export const LInput = styled(Input)`
  width: 80rem;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  div:first-child {
    input {
      margin-right: 1rem;
    }
  }
  div:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

export const Payment = styled.section`
  width: 76rem;
  float: left;
  div {
    padding: 1.7rem;
    border-top: 2px solid ${COLOR.greyC4};
    border-bottom: 2px solid ${COLOR.greyC4};
  }
  label {
    margin-right: 2rem;
  }
  input {
    accent-color: ${COLOR.accentColor};
    margin-right: 1rem;
  }
`;

export const PayInfo = styled.section`
  width: 48rem;
  float: right;
`;

export const InfoWrapper = styled.div`
  border: 1px solid ${COLOR.accentColor};
  border-radius: 1rem;
  overflow: hidden;
  dl {
    padding: 3.4rem 3rem 1rem;
    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.2rem;
      dd > span {
        font-size: 1.8rem;
        font-weight: 700;
      }
    }
    div:last-child {
      border-top: 1px solid ${COLOR.greyC4};
      padding-top: 2.8rem;
      dd {
        font-size: 2.4rem;
        color: ${COLOR.red};
        span {
          font-size: inherit;
        }
      }
    }
  }
  & > div {
    padding: 3rem 3rem 3.4rem;
    background-color: ${COLOR.greyF2};
    div {
      position: relative;
    }
    input {
      accent-color: ${COLOR.accentColor};
      margin-right: 1rem;
    }
    span {
      position: absolute;
      top: 1.4rem;
      left: 1.2rem;
    }
    button {
      display: block;
      margin: 3.2rem auto 0;
    }
  }
`;

export const Error = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2;
  color: ${COLOR.red};
  margin-left: 1rem;
  /* word-break: keep-all; */
`;
