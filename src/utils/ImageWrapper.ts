import styled from 'styled-components';

interface props {
  width?: number;
  height?: number;
  margin?: string;
  imgStyle?: string;
}

export default styled.div<props>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  margin: ${({ margin }) => margin};
  position: relative;
  & > * {
    width: 100%;
    height: 100%;
    ${({ imgStyle }) => imgStyle}
  }
`;
