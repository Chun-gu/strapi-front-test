import styled from "styled-components";
import { COLOR } from '@styles/color';

interface ICustomProps {
  disabled: boolean;
  width: number;
  height: number;
  fontSize: number;
  color: string;
}

export const Custom = styled.button<ICustomProps>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  &:disabled {
    background-color: ${COLOR.greyC4};
  }
  ${(props) => {
    if (props.disabled) {
      return `
      color: ${COLOR.white};
      background-color: ${COLOR.greyC4}`;
    }
    switch (props.color) {
      case "green":
        return `
          color: ${COLOR.white};
          background-color: ${COLOR.accentColor}`;
      case "dark":
        return `
          color: ${COLOR.white};
          background-color: ${COLOR.grey76}`;
      case "white":
        return `
          background-color: ${COLOR.white};
          border: 0.1rem solid ${COLOR.greyC4};
          &:hover {
            color:${COLOR.black}; 
            border-color: ${COLOR.grey76};
          };`;
      default:
        return ``;
    }
  }};
  font-size: ${(props) => props.fontSize}rem;
  font-weight: ${(props) => (props.fontSize >= 1.8 ? 700 : 500)};
  vertical-align: middle;
  padding: 0 ${(props) => Math.floor((props.height - props.fontSize) / 2)}rem;
  border-radius: 0.5rem;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  width: 32rem;
  height: 6rem;
  color: ${(props) => (props.isActive ? COLOR.accentColor : COLOR.grey76)};
  font-size: 1.8rem;
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  background-color: ${COLOR.white};
  border-bottom: 0.6rem solid;
  border-color: ${(props) =>
    props.isActive ? COLOR.accentColor : COLOR.greyE0};
  &:hover {
    color: ${COLOR.accentColor};
    background-color: ${COLOR.lightGreen};
  }
`;

export const Menu = styled.button<{ isActive: boolean }>`
  width: 20rem;
  height: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => (props.isActive ? COLOR.white : COLOR.black)};
  background-color: ${(props) =>
    props.isActive ? COLOR.accentColor : COLOR.white};
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  &:hover {
    background-color: ${(props) =>
      props.isActive ? COLOR.accentColor : COLOR.lightGreen};
  }
`;

export const Badge = styled.span`
  height: 2rem;
  color: ${COLOR.white};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2rem;
  background-color: ${COLOR.red};
  border-radius: 1rem;
  padding: 0 0.7rem;
`;
