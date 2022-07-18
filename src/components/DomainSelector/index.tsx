import { useRef, useState, useEffect, useCallback } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import UpIcon from "public/assets/icons/icon-caret-up.svg";
import DownIcon from "public/assets/icons/icon-caret-down.svg";
import * as Styled from "./styled";

const domains = ["gmail.com", "naver.com", "daum.net", "직접 입력"];

const DomainSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName>,
) => {
  const { field, fieldState } = useController(props);

  const [isOpen, setIsOpen] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const domainListRef = useRef<HTMLUListElement>(null);

  const onClickDomain = (e: React.MouseEvent<HTMLLIElement>) => {
    const domain = (e.target as HTMLLIElement).textContent || "";
    if (domain === "직접 입력") {
      setIsCustomDomain(true);
      field.onChange("");
    } else {
      setIsCustomDomain(false);
      field.onChange(domain);
    }
    setIsOpen(false);
  };

  const onClickOutside = useCallback((e: MouseEvent) => {
    if (
      domainListRef.current &&
      !domainListRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    )
      setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isCustomDomain && inputRef && inputRef.current)
      inputRef.current.focus();
    if (isOpen) document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [field, isCustomDomain, isOpen, onClickOutside]);

  return (
    <>
      <Styled.Wrapper>
        <Styled.Label htmlFor="domain" isValid={!fieldState?.error?.message}>
          <span className="sr-only">도메인</span>
          <Styled.Input
            disabled={!isCustomDomain}
            placeholder="도메인"
            {...field}
            ref={inputRef}
            onBlur={() => setIsCustomDomain(false)}
          />
          <Styled.Button
            type="button"
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <UpIcon width={20} height={20} />
            ) : (
              <DownIcon width={20} height={20} />
            )}
          </Styled.Button>
        </Styled.Label>

        {isOpen && (
          <Styled.DomainList ref={domainListRef}>
            {domains.map((domain) => (
              <li key={domain} onClick={onClickDomain} tabIndex={0}>
                {domain}
              </li>
            ))}
          </Styled.DomainList>
        )}
      </Styled.Wrapper>
    </>
  );
};

export default DomainSelector;
