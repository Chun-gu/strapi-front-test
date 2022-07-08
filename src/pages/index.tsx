import React, { useRef } from "react";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getProducts } from "@api";
import { ProductItem, Loader, ScrollToTopButton } from "@components";
import { useIntersectionObserver } from "@hooks";
import { IApiResponse, IProduct } from "@types";
import styled from "styled-components";

const Home: NextPage = () => {
  const {
    isLoading,
    data: products,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IApiResponse<IProduct[]>>(["getProducts"], getProducts, {
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination.page === pagination.pageCount) return false;

      return pagination.page + 1;
    },
  });

  const bottomRef = useRef(null);
  const entry = useIntersectionObserver(bottomRef, {});
  const isVisible = !!entry?.isIntersecting;

  if (isLoading) return <Loader.ProductListLoader />;
  if (error || products === null) return <div>에러발생</div>;
  if (products && isVisible && hasNextPage) {
    fetchNextPage();
  }

  return (
    <>
      <Head>
        <title>원두 마켓</title>
        <meta property="og:title" content="원두 마켓" key="title" />
      </Head>

      <h1 className="sr-only">제품 목록</h1>
      <ProductList>
        {products?.pages?.map((group, index) => (
          <React.Fragment key={index}>
            {group.data.map((product) => (
              <li key={product.id}>
                <ProductItem {...product} />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ProductList>
      {isFetchingNextPage && <Loader.ProductListLoader />}
      <div ref={bottomRef} />
      <ScrollToTopButton />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["getProducts"], getProducts);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 38rem);
  justify-content: space-around;
  gap: 3rem;
`;
