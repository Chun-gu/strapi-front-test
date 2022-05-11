interface IProductProps {
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

const Product = (props: IProductProps) => {
  const { productName, price, discountRate, stock, description } =
    props.attributes;

  return (
    <li>
      <h2>{productName}</h2>
      <span>가격: {price}</span>
      <span>할인율: {discountRate}</span>
      <span>재고: {stock}</span>
      <p>제품 설명: {description}</p>
    </li>
  );
};

export default Product;
