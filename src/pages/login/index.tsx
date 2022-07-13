import { useState } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Buttons, Spinner } from "@components";
import PasswordVisible from "public/assets/icons/icon-password-visible.svg";
import PasswordInvisible from "public/assets/icons/icon-password-invisible.svg";
import * as Styled from "./styled";

interface IFormValues {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormValues>({ mode: "onChange" });

  const onSubmit = async (values: IFormValues) => {
    const { username, password } = values;
    const response = await signIn<"credentials">("credentials", {
      username,
      password,
      callbackUrl: "/",
      redirect: false,
    });
    if (response && response.ok === false)
      alert("아이디 혹은 비밀번호를 확인해주세요.");
  };

  const storage = globalThis?.sessionStorage;
  const prevPath = storage?.getItem("prevPath") || "/";

  if (status === "loading") return <Spinner />;
  if (status === "authenticated") {
    router.push(prevPath);
    return null;
  }

  return (
    <Styled.Wrapper>
      <Styled.Title>로그인</Styled.Title>
      <Styled.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Styled.InputWrapper>
          <label htmlFor="username" className="sr-only">
            아이디
          </label>
          <Styled.Input
            id="username"
            placeholder="아이디"
            {...register("username", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "영문, 숫자만 입력해주세요.",
              },
            })}
          />
          {errors.username && (
            <Styled.ErrorMsg>{errors.username.message}</Styled.ErrorMsg>
          )}
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <Styled.Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            maxLength={16}
            placeholder="비밀번호"
            {...register("password", { required: true })}
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
        </Styled.InputWrapper>

        <Buttons.Custom
          width={33.3}
          height={6}
          fontSize={1.8}
          color="green"
          disabled={!isValid}
        >
          로그인
        </Buttons.Custom>
      </Styled.LoginForm>
      <Styled.Links>
        <li>
          <Link href="/register" passHref>
            <a>회원가입</a>
          </Link>
        </li>
        <li>
          <Link href="/" passHref>
            <a>아이디 찾기</a>
          </Link>
        </li>
        <li>
          <Link href="/" passHref>
            <a>비밀번호 찾기</a>
          </Link>
        </li>
      </Styled.Links>
    </Styled.Wrapper>
  );
};

export default Login;
