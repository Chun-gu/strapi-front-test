import { ReactNode, useEffect, useRef, useState } from 'react';
import * as Styled from './styled';

type TooltipProps = { children: ReactNode };

const Tooltip = ({ children }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const clickOutside = (e: MouseEvent) => {
    if (
      isVisible &&
      !tooltipRef.current?.contains(e.target as HTMLDivElement)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  return <Styled.Container ref={tooltipRef}>{children}</Styled.Container>;
};

export default Tooltip;
