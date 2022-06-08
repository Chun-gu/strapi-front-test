import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import UserIcon from '/public/images/icon-user.svg';
import ToggleDownIcon from '/public/images/icon-triangle-downward.svg';
import ToggleUpIcon from '/public/images/icon-triangle-upward.svg';
import ImageWrapper from '@utils/ImageWrapper';
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
            <ImageWrapper width={3.2}>
              <UserIcon />
            </ImageWrapper>
            <span className="single-ellipsis">{session.user?.username}</span>
            {isOpen && (
              <Styled.Tooltip>
                <li>
                  <Link href="/mypage">마이페이지</Link>
                </li>
                <li>
                  <button type="button" onClick={() => signOut()}>
                    로그아웃
                  </button>
                </li>
              </Styled.Tooltip>
            )}
          </Styled.UserButton>
        </>
      ) : (
        <Link href="/login">
          <>
            <ImageWrapper>
              <UserIcon />
            </ImageWrapper>
            로그인
          </>
        </Link>
      )}
    </Styled.Container>
  );
};

export default UserMenu;
