import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Tooltip from '../Tooltip';
import UserIcon from '/public/images/icon-user.svg';
import * as Styled from './styled';

const UserMenu = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Styled.Container>
      {session ? (
        <>
          <Styled.UserButton onClick={toggleTooltip}>
            <Styled.UserIcon width={32} height={32} />
            <Styled.Username className="ellipsis-single">
              {session.user?.username}
            </Styled.Username>
          </Styled.UserButton>
          {isOpen && (
            <Tooltip isOpen={isOpen} setIsOpen={setIsOpen}>
              <Styled.List>
                <li>
                  <Link href="/mypage">
                    <a>마이페이지</a>
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={() => signOut()}>
                    로그아웃
                  </button>
                </li>
              </Styled.List>
            </Tooltip>
          )}
        </>
      ) : (
        <Link href="/login">
          <Styled.LoginLink>
            <Styled.UserIcon width={32} height={32} />
            <span>로그인</span>
          </Styled.LoginLink>
        </Link>
      )}
    </Styled.Container>
  );
};

export default UserMenu;
