import styled from 'styled-components';
import { COLOR } from '@shared/constants';

export const Count = styled.div`
  height: 11rem;
  border-top: 0.2rem solid ${COLOR.greyC4};
  border-bottom: 0.2rem solid ${COLOR.greyC4};
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
`;

export const Counter = styled.div`
  display: inline-block;
  height: 5rem;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const CounterButton = styled.button`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  &:hover {
    background-color: ${COLOR.accentColor};
    svg > path {
      stroke: ${COLOR.white};
    }
  }
`;

export const CounterInput = styled.input`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  font-size: 1.8rem;
  text-align: center;
  vertical-align: top;
  border-left: 1px solid ${COLOR.greyC4};
  border-right: 1px solid ${COLOR.greyC4};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const CountNPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 2.2rem;
  div {
    display: flex;
    align-items: center;
  }
`;

export const TotalCount = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 400;
  color: ${COLOR.grey76};
  padding-right: 1.2rem;
  border-right: 0.1rem solid ${COLOR.greyC4};
  margin-right: 1.2rem;
  span {
    font-weight: 700;
    color: ${COLOR.accentColor};
  }
`;

export const TotalPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${COLOR.accentColor};
  span {
    font-size: 3.6rem;
    font-weight: 700;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 7rem;
  right: 0;
  width: 20rem;
  padding: 1rem 0.5rem 0;
  border: 1px solid ${COLOR.greyC4};
  border-radius: 0.5rem;
  background-color: ${COLOR.white};
  p {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  button {
    margin-bottom: 1rem;
  }
`;
