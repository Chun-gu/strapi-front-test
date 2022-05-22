import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") console.log(session);

  return (
    <header>
      <button type="button">유저</button>
      {session ? (
        <button type="button" onClick={signOut}>
          로그아웃
        </button>
      ) : (
        <Link href="/login">
          <button>로그인</button>
        </Link>
      )}
    </header>
  );
};

export default NavBar;
