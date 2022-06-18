import styled from "styled-components";

interface props {
  width?: number;
  height?: number;
  margin?: string;
  borderColor?: string;
  borderRadius?: number | string;
}

export default styled.div<props>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  margin: ${({ margin }) => margin};
  ${({ borderColor }) => borderColor ?? `border: 1px solid ${borderColor}`};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === "number" ? `${borderRadius}rem` : borderRadius};
  position: relative;
  overflow: hidden;
  & > * {
    width: 100%;
    height: 100%;
  }
`;
