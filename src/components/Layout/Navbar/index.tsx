import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import * as Styled from './styled';
import { Tooltip } from '@components';
import User from 'public/images/icon-user.svg';
import Logo from 'public/images/logo.svg';

const NavBar = () => {
  const { data: session, status } = useSession();
  console.log('현재 session 정보', session);
  return (
    <Styled.Header>
      <Styled.Container>
        <Logo />
        <div>
          <Link href="/join">
            <button>회원가입</button>
          </Link>
          <Link href="/addProduct">
            <button>제품등록</button>
          </Link>
          <Link href="/products">
            <button>제품목록</button>
          </Link>
          <Link href="/addReview">
            <button>리뷰등록</button>
          </Link>
          <Link href="/addComment">
            <button>댓글등록</button>
          </Link>
          <Link href="/addInquiry">
            <button>문의등록</button>
          </Link>
          <Link href="/addAnswer">
            <button>답변등록</button>
          </Link>
          <Link href="/addCart">
            <button>장바구니 등록</button>
          </Link>
          <Link href="/addOrder">
            <button>주문 등록</button>
          </Link>
        </div>
        <div>
          <Tooltip>
            <User />
            <button type="button">마이페이지</button>
          </Tooltip>

          {session ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/login">
              <button>로그인</button>
            </Link>
          )}
        </div>
      </Styled.Container>
    </Styled.Header>
  );
};

export default NavBar;
