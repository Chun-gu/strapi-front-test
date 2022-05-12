import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { nanoid } from "nanoid";
import Error from "next/error";

interface IFormValues {
  username: string;
  password: string;
  email: string;
  phone: string;
  nickname: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit = async (values: IFormValues) => {
    console.log(values);
    const { username, password, phone, email, nickname } = values;
    const userId = `userId-${nanoid()}`;
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          userId,
          username,
          password,
          email,
          phone,
          nickname,
        }
      );
      if (response.status === 200) {
        alert("회원가입 성공");
      }
    } catch (error) {
      console.log(error.message);
      // alert(response.data.error.message);
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
