import { MouseEventHandler, ReactNode } from "react";
import * as Styled from "./styled";

interface IButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
}

interface ICustomButtonProps extends IButtonProps {
  width: number;
  height: 3 | 4 | 5 | 5.4 | 6 | 6.8;
  fontSize: number;
  color: "green" | "dark" | "white";
  form?: string;
  disabled: boolean;
}

interface ITabButtonProps extends IButtonProps {
  isActive: boolean;
}

interface IMenuButtonProps extends IButtonProps {
  isActive: boolean;
  badgeCount: number | undefined;
}

export function Custom({
  form,
  disabled,
  width,
  height,
  color,
  onClick,
  fontSize,
  children,
  type,
}: ICustomButtonProps) {
  return (
    <Styled.Custom
      form={form}
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
      type={type}
    >
      {children}
    </Styled.Custom>
  );
}

export function Tab({ onClick, isActive, children }: ITabButtonProps) {
  return (
    <Styled.Tab onClick={onClick} isActive={isActive}>
      {children}
    </Styled.Tab>
  );
}

export function Menu({
  onClick,
  isActive,
  badgeCount,
  children,
}: IMenuButtonProps) {
  return (
    <Styled.Menu onClick={onClick} isActive={isActive}>
      {children}
      {!!badgeCount && <Styled.Badge>{badgeCount}</Styled.Badge>}
    </Styled.Menu>
  );
}

// Custom.defaultProps = {
//   onClick: () => {},
// };

// Tab.defaultProps = {
//   onClick: () => {},
// };

// Menu.defaultProps = {
//   onClick: () => {},
// };
