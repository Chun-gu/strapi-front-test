import React from 'react';
import * as Styled from './styled';

interface DefaultContainerProps {
  children: React.ReactNode;
}

function DefaultContainerPage({ children }: DefaultContainerProps) {
  return <Styled.DefaultContainer>{children}</Styled.DefaultContainer>;
}

export default DefaultContainerPage;
