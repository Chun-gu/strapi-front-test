import { getProducts } from "@api";
import { IApiResponse, IProduct } from "@types";
import { GetServerSideProps, NextPage } from "next";

const Product: NextPage<IApiResponse<IProduct>> = ({ data, meta }) => (
  <div>
    <h2>{data.attributes.productName}</h2>
    <span>가격: {data.attributes.price}</span>
    <span>할인율: {data.attributes.discountRate}</span>
    <span>재고: {data.attributes.stock}</span>
    <p>제품 설명: {data.attributes.description}</p>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.params?.productId;
  const data = await getProducts(productId);
  console.log(data);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: data.data,
      meta: data.meta,
    },
  };
};

export default Product;
