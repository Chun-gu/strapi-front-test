import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import * as Styled from "./styled";

type TooltipProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Tooltip = ({ children, isOpen, setIsOpen }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const clickOutside = (e: MouseEvent) => {
    if (isOpen && !tooltipRef.current?.contains(e.target as HTMLDivElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return isOpen ? (
    <Styled.Container ref={tooltipRef}>{children}</Styled.Container>
  ) : null;
};

export default Tooltip;
