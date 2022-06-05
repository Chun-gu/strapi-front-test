import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IRegisterUserValues } from "src/types";
import { useMutation } from "react-query";
import { addUser } from "@api";

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<IRegisterUserValues>();

  const onSubmit = async (values: IRegisterUserValues) => {
    // const { data, error } = useMutation("registerUser", () => addUser(values));
    try {
      const data = await addUser(values);
      if (data) alert("회원가입 성공");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error
          .message;
        alert(`가입 실패\n${errorMessage}`);
      } else {
        alert("가입 도중에 오류 발생");
      }
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" {...register("username")} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="text" id="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="nickname">별명</label>
          <input type="text" id="nickname" {...register("nickname")} />
        </div>
        <div>
          <label htmlFor="phone">전화번호</label>
          <input type="string" id="phone" {...register("phone")} />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default Login;
