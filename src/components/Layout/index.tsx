import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

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
  width: 128rem;
  padding: 8.5rem 0;
  margin: 0 auto;
`;
