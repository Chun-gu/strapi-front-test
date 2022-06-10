import styled from 'styled-components';

interface props {
  width?: number;
  height?: number;
  margin?: string;
  borderColor: string;
  borderRadius?: number;
  imgStyle?: string;
}

export default styled.div<props>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  margin: ${({ margin }) => margin};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: ${({ borderRadius }) => borderRadius}rem;
  position: relative;
  overflow: hidden;
  & > * {
    width: 100%;
    height: 100%;
    ${({ imgStyle }) => imgStyle}
  }
`;
