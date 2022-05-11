import { GetStaticProps, NextPage } from "next";
import Product from "../components/product";
import { fetcher } from "../lib/api";

interface IProducts {
  products: {
    data: [
      {
        id: number;
        attributes: {
          productId: string;
          productName: string;
          option: string;
          price: number;
          discountRate: number;
          stock: number;
          description: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      }
    ];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
}

const Products: NextPage<IProducts> = (props) => {
  console.log(props.products.data);
  return (
    <>
      <h1>상품 목록</h1>
      <ul>
        {props.products.data.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </ul>
    </>
  );
};

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetcher("http://localhost:1337/api/products");
  console.log("응답:", data);
  return {
    props: {
      products: data,
    },
  };
};
