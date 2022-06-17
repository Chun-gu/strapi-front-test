import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getProducts } from "@api";
import { ProductCard, ProductsLoader } from "@components";
import { IProduct } from "@types";
import styled from "styled-components";

const Home: NextPage = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery<IProduct[], Error>(["getProducts"], () => getProducts());

  if (isLoading) return <ProductsLoader />;
  if (error || products === null) return <div>에러발생</div>;

  return (
    <>
      <Head>
        <title>원두 마켓</title>
        <meta property="og:title" content="원두 마켓" key="title" />
      </Head>

      <h1 className="sr-only">제품 목록</h1>
      <ProductList>
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard {...product} />
          </li>
        ))}
      </ProductList>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getProducts"], () => getProducts());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 38rem);
  justify-content: space-around;
  gap: 3rem;
`;
