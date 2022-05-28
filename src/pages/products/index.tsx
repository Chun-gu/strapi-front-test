import { GetStaticProps, NextPage } from "next";
// import { dehydrate, QueryClient, useQuery } from "react-query";
import { IApiResponse, IProduct } from "@types";
import { getProducts } from "@api";
import Link from "next/link";

const ProductsPage: NextPage<IApiResponse<IProduct[]>> = ({ data, meta }) => {
  console.log("products", data);
  // const { isLoading, error, data } = useQuery<IProducts, Error>(
  //   "products",
  //   getProducts
  // );
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return `에러 발생: ${error.message}`;
  // console.log(data);
  console.log(data);

  return (
    <>
      <h1>상품 목록</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <Link
              href={{ pathname: "products/[id]", query: { id: product.id } }}
            >
              {product.attributes.productName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps = async () => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery("getProducts", getProducts);

  const data = await getProducts();

  return {
    props: {
      data: data.data,
      meta: data.meta,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
