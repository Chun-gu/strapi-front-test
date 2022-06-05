import { IProduct } from "src/types";

const Product = (props: IProduct) => {
  const { productName, price, discountRate, stock, description } =
    props.attributes;

  return (
    <li>
      <h2>{productName}</h2>
    </li>
  );
};

export default Product;
