import { nanoid } from "nanoid";
import React, { ChangeEvent, useCallback, useState } from "react";
import Check from "public/images/icon-check.svg";
import { COLOR } from "@shared/constants";
import { UseFormRegisterReturn } from "react-hook-form";
import * as Styled from "./styled";

interface InputProps {
  width?: number;
  minLength?: number;
  maxLength?: number;
  hook?: UseFormRegisterReturn;
  name?: string;
}

interface TextInputProps extends InputProps {
  placeholder: string;
  className?: string;
}

interface TextInputBoxProps extends InputProps {
  labelName?: string | null;
  placeholder?: string;
  option?: string;
  validationMsg?: string;
  unit?: string;
  type?: string;
}

function TextInputComponent({
  width,
  placeholder,
  className,
  hook,
}: TextInputProps) {
  const id = nanoid();
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <Styled.Input
        className={className}
        type="text"
        id={id}
        placeholder={placeholder}
        width={width}
        // maxLength={maxLength}
        {...hook}
      />
    </>
  );
}

export function TextInputBoxComponent({
  width,
  minLength,
  maxLength,
  labelName,
  placeholder,
  option,
  validationMsg,
  unit,
  type,
  hook,
  name,
}: TextInputBoxProps) {
  const [value, setValue] = useState<string>("");
  const format = useCallback((val: string) => {
    const numbers = val.replace(/[^0-9]/g, "");
    return numbers ? Number(numbers).toLocaleString("ko-kr") : "";
  }, []);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      hook?.onChange(e);
    },
    [hook],
  );
  const isValid = false;
  const id = nanoid();

  return (
    <Styled.Box width={width}>
      {labelName && <Styled.Label htmlFor={id}>{labelName}</Styled.Label>}
      <Styled.InputBox
        type={option === "password" ? "password" : type}
        id={id}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={option === "unit" ? format(value) : value}
        placeholder={placeholder}
        hasOption={option !== "none"}
        {...hook}
        onChange={handleChange}
      />
      {validationMsg && (
        <Styled.ValidationMsg option={option}>
          {validationMsg}
        </Styled.ValidationMsg>
      )}
      {(() => {
        switch (option) {
          case "limit":
            return (
              <Styled.Limit>{`${value.length}/${maxLength}`}</Styled.Limit>
            );
          case "password":
            return (
              <Styled.CheckWrapper
                width={2.8}
                height={2.8}
                imgStyle={`
                  & circle {
                    fill: ${isValid ? COLOR.accentColor : COLOR.greyF2};
                  }
                `}
              >
                <Check viewBox="0 0 28 28" />
              </Styled.CheckWrapper>
            );
          case "unit": {
            return <Styled.Unit>{unit}</Styled.Unit>;
          }
          default:
            return null;
        }
      })()}
    </Styled.Box>
  );
}

TextInputComponent.defaultProps = {
  width: "100%",
  maxLength: "",
  minLength: "",
  className: "",
  hook: null,
  name: "",
};

TextInputBoxComponent.defaultProps = {
  width: "100%",
  maxLength: "",
  minLength: "",
  labelName: null,
  placeholder: "",
  option: "none",
  validationMsg: "",
  unit: "",
  type: "text",
  hook: null,
  name: "",
};

export const TextInput = React.memo(TextInputComponent);
export const TextInputBox = React.memo(TextInputBoxComponent);
