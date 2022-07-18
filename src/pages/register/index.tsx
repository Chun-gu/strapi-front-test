import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { addUser } from "src/api";
import { Buttons, DomainSelector, Spinner } from "@components";
import PasswordVisible from "public/assets/icons/icon-password-visible.svg";
import PasswordInvisible from "public/assets/icons/icon-password-invisible.svg";
import * as Styled from "./styled";

export interface RegisterFormValues {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  domain: string;
  phone1: string;
  phone2: string;
  phone3: string;
  isUsernameChecked: boolean;
  isUsernameExist: boolean;
}

const Register: NextPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9]+$/g;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/g;
  const emailRegex = /^\w+([\.-]?\w+)*/g;
  const domainRegex = /^\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

  const {
    watch,
    control,
    trigger,
    register,
    setFocus,
    setError,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      domain: "",
      isUsernameChecked: false,
      isUsernameExist: true,
    },
  });

  const checkUsername = useCallback(async (username: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<boolean>(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/username-existence/${username}`,
      );
      setIsLoading(false);
      return data;
    } catch (error) {
      alert("에러가 발생했습니다. 잠시 후 다시 시도해주시기 바랍니다.");
      setIsLoading(false);
      return undefined;
    }
  }, []);

  const checkIsUsernameExist = useCallback(async () => {
    const username = getValues("username");
    const isExist = await checkUsername(username);
    if (isExist === true) {
      setError(
        "username",
        {
          type: "alreadyExist",
          message: "이미 존재하는 아이디입니다.",
        },
        { shouldFocus: true },
      );
    } else if (isExist === false) {
      alert("사용가능한 아이디입니다.");
      setValue("isUsernameExist", false);
      clearErrors("username");
    }
    setValue("isUsernameChecked", true);
    trigger("username");
  }, [checkUsername, clearErrors, getValues, setError, setValue, trigger]);

  const checkIsPasswordSame = useCallback(() => {
    const isSame = getValues("password") === getValues("passwordConfirm");
    if (isSame) return true;
    return false;
  }, [getValues]);

  const onSubmit = useCallback(async () => {
    // const { data, error } = useMutation("registerUser", () => addUser(values));
    const { username, password, email, domain, phone1, phone2, phone3 } =
      getValues();
    const fullEmail = `${email}@${domain}`;
    const phone = `${phone1}-${phone2}-${phone3}`;
    const values = { username, password, email: fullEmail, phone };
    try {
      const data = await addUser(values);
      if (data) alert("회원가입에 성공했습니다.");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error
          .message;
        alert(`가입 실패\n${errorMessage}`);
      } else {
        alert("가입 도중에 오류 발생");
      }
    }
  }, [getValues, router]);

  return (
    <>
      <Styled.Title>회원가입</Styled.Title>
      <Styled.JoinForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="username">아이디</Styled.Label>
          <Styled.UsernameInput
            type="text"
            id="username"
            minLength={4}
            maxLength={16}
            placeholder="4 ~ 16자의 영문, 숫자"
            isValid={!errors.username}
            {...register("username", {
              required: "아이디를 입력해주세요.",
              pattern: {
                value: usernameRegex,
                message: "영문, 숫자만 입력해주세요.",
              },
              minLength: {
                value: 4,
                message: "4자 이상이어야 합니다.",
              },
              validate: {
                usernameCheck: () =>
                  getValues("isUsernameChecked") || "중복확인을 해주세요.",
              },
              onChange: () => {
                setValue("isUsernameChecked", false);
                !getValues("isUsernameExist") &&
                  setValue("isUsernameExist", true);
              },
            })}
          />
          <Styled.UsernameButtonWrapper>
            <Buttons.Custom
              type="button"
              width={10}
              height={4.3}
              fontSize={1.6}
              color="green"
              disabled={
                !watch("username") ||
                errors?.username?.type !== "usernameCheck" ||
                !watch("isUsernameExist") ||
                isLoading
              }
              onClick={checkIsUsernameExist}
            >
              중복확인
            </Buttons.Custom>
            {isLoading && <Spinner size={3} />}
          </Styled.UsernameButtonWrapper>
          {errors.username && (
            <Styled.ErrorMsg>{errors.username.message}</Styled.ErrorMsg>
          )}
          {getValues("isUsernameChecked") && !getValues("isUsernameExist") && (
            <Styled.ValidUsernameMessage>
              사용가능한 아이디입니다.
            </Styled.ValidUsernameMessage>
          )}
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="password">비밀번호</Styled.Label>
          <Styled.PasswordInput
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            maxLength={16}
            placeholder="8 ~ 16자의 영문, 숫자, 특수문자"
            isValid={!errors.password}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: passwordRegex,
                message: "8 ~ 16자의 영문, 숫자, 특수문자를 조합해주세요.",
              },
              validate: {
                checkIsSame: () =>
                  checkIsPasswordSame() || "비밀번호가 일치하지 않습니다.",
              },
              onChange: () => trigger("passwordConfirm"),
            })}
          />
          <Styled.VisibilityButton
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <PasswordVisible width="100%" height="100%" />
            ) : (
              <PasswordInvisible width="100%" height="100%" />
            )}
          </Styled.VisibilityButton>
          {errors.password && (
            <Styled.ErrorMsg>{errors.password.message}</Styled.ErrorMsg>
          )}
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="passwordConfirm">비밀번호 확인</Styled.Label>
          <Styled.PasswordInput
            type={isPasswordVisible ? "text" : "password"}
            id="passwordConfirm"
            maxLength={16}
            placeholder="비밀번호를 한 번 더 입력하세요."
            isValid={!errors.passwordConfirm}
            {...register("passwordConfirm", {
              required: "비밀번호를 한 번 더 입력해주세요.",
              pattern: {
                value: passwordRegex,
                message: "8 ~ 16자의 영문, 숫자, 특수문자를 조합해주세요.",
              },
              validate: {
                checkIsSame: () =>
                  checkIsPasswordSame() || "비밀번호가 일치하지 않습니다.",
              },
              onChange: () => trigger("password"),
            })}
          />
          <Styled.VisibilityButton
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <PasswordVisible width="100%" height="100%" />
            ) : (
              <PasswordInvisible width="100%" height="100%" />
            )}
          </Styled.VisibilityButton>
          {errors.passwordConfirm && (
            <Styled.ErrorMsg>{errors.passwordConfirm.message}</Styled.ErrorMsg>
          )}
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="email">이메일</Styled.Label>
          <Styled.EmailInputWrapper>
            <Styled.Input
              type="text"
              id="email"
              isValid={!errors.email}
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일을 확인해주세요.",
                },
              })}
            />
            {"@"}
            <DomainSelector
              control={control}
              name="domain"
              rules={{
                required: "도메인을 입력해주세요.",
                pattern: {
                  value: domainRegex,
                  message: "도메인 형식을 확인해주세요.",
                },
              }}
            />
          </Styled.EmailInputWrapper>
          {(errors.email || errors.domain) && (
            <Styled.ErrorMsg>
              {errors.email?.message || errors.domain?.message}
            </Styled.ErrorMsg>
          )}
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <Styled.Label htmlFor="phone1">전화번호</Styled.Label>
          <Styled.PhoneInputWrapper>
            <Styled.PhoneInput
              type="text"
              id="phone1"
              maxLength={3}
              isValid={!errors.phone1}
              {...register("phone1", {
                required: "전화번호를 입력해주세요.",
                pattern: {
                  value: /^[0-9]{2,3}$/g,
                  message: "전화번호를 확인해주세요.",
                },
                onChange: (e) => {
                  if (e.target.value.length === 3 && !errors.phone1) {
                    setFocus("phone2");
                  }
                },
              })}
            />
            {"-"}
            <Styled.PhoneInput
              type="text"
              id="phone2"
              maxLength={4}
              isValid={!errors.phone2}
              {...register("phone2", {
                required: "전화번호를 입력해주세요.",
                pattern: {
                  value: /^[0-9]{3,4}$/g,
                  message: "전화번호를 확인해주세요.",
                },
                onChange: (e) => {
                  if (e.target.value.length === 4 && !errors.phone2) {
                    setFocus("phone3");
                  }
                },
              })}
            />
            {"-"}
            <Styled.PhoneInput
              type="text"
              id="phone3"
              maxLength={4}
              isValid={!errors.phone3}
              {...register("phone3", {
                required: "전화번호를 입력해주세요.",
                pattern: {
                  value: /^[0-9]{4}$/g,
                  message: "전화번호를 확인해주세요.",
                },
              })}
            />
          </Styled.PhoneInputWrapper>
          {(errors.phone1 || errors.phone2 || errors.phone3) && (
            <Styled.ErrorMsg>
              {errors.phone1?.message ||
                errors.phone2?.message ||
                errors.phone3?.message}
            </Styled.ErrorMsg>
          )}
        </Styled.InputWrapper>
        <Styled.SubmitButtonWrapper>
          <Buttons.Custom
            width={33.3}
            height={6}
            fontSize={1.8}
            color="green"
            disabled={!isValid || isSubmitting}
          >
            회원가입
          </Buttons.Custom>
          {isSubmitting && <Spinner size={4} />}
        </Styled.SubmitButtonWrapper>
      </Styled.JoinForm>
    </>
  );
};

export default Register;
