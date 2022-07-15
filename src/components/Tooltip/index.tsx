import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useCallback,
} from "react";
import * as Styled from "./styled";

interface TooltipProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Tooltip = ({ children, isOpen, setIsOpen }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node))
        setIsOpen(false);
    },
    [setIsOpen],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", onClickOutside);
    const countdown = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => {
      clearTimeout(countdown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen, onClickOutside, setIsOpen]);

  return isOpen ? (
    <Styled.Container ref={tooltipRef}>{children}</Styled.Container>
  ) : null;
};

export default Tooltip;
