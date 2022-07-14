import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 128rem;
  min-height: calc(100vh - 10rem);
  padding: 8.5rem 0;
  margin: 0 auto;
`;
