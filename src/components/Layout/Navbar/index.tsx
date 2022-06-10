import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Logo from 'public/images/logo.svg';
import UserMenu from 'src/components/UserMenu';
import * as Styled from './styled';

const NavBar = () => {
  const { data: session } = useSession();
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
        <Styled.UserMenuWrapper>
          {session && (
            <Link href="/cart">
              <Styled.CartLink>
                <Styled.CartIcon width={32} height={32} />
                <span>장바구니</span>
              </Styled.CartLink>
            </Link>
          )}
          <UserMenu />
        </Styled.UserMenuWrapper>
      </Styled.Container>
    </Styled.Header>
  );
};

export default NavBar;
