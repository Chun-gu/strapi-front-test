import styled from 'styled-components';

interface props {
  width?: string;
  height?: string;
  imgStyle?: string;
}

export default styled.div<props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
  & > * {
    width: 100%;
    height: 100%;
    ${({ imgStyle }) => imgStyle}
  }
`;
