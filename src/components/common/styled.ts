import { MIN_MARGIN, NAV_HEIGHT, NAV_WIDTH } from '@shared/constants';
import styled from 'styled-components';

export const DefaultContainer = styled.div`
  max-width: ${NAV_WIDTH + MIN_MARGIN * 2}rem;
  padding: 0 ${MIN_MARGIN}rem;
  margin: ${NAV_HEIGHT}rem auto 0;
`;
