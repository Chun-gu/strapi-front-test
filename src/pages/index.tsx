import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Link href="/join">회원가입</Link>
      </div>
      <div>
        <Link href="/login">로그인</Link>
      </div>
      <div>
        <Link href="/addProduct">상품등록</Link>
      </div>
      <div>
        <Link href="/products">상품목록</Link>
      </div>
    </>
  );
};

export default Home;
