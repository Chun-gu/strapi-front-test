import axios from "axios";
import { nanoid } from "nanoid";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface IFormValues {
  productName: string;
  option: string;
  price: number;
  discountRate: number;
  stock: number;
}

const AddProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit = async (values: IFormValues) => {
    const { productName, option, price, discountRate, stock } = values;
    const productId = `productId-${nanoid()}`;
    const response = await axios.post("http://localhost:1337/api/products", {
      data: {
        productId,
        productName,
        option,
        price,
        discountRate,
        stock,
      },
    });
    if (response.status === 200) {
      alert("상품등록 성공");
    }
    console.log(response);
  };

  return (
    <>
      <h1>상품 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productName">상품명</label>
          <input type="text" id="productName" {...register("productName")} />
        </div>
        <div>
          <label htmlFor="option">옵션</label>
          <input type="text" id="option" {...register("option")} />
        </div>
        <div>
          <label htmlFor="price">가격</label>
          <input type="text" id="price" {...register("price")} />
        </div>
        <div>
          <label htmlFor="discountRate">할인율</label>
          <input type="text" id="discountRate" {...register("discountRate")} />
        </div>
        <div>
          <label htmlFor="stock">재고</label>
          <input type="text" id="stock" {...register("stock")} />
        </div>
        <button type="submit">상품 등록</button>
      </form>
    </>
  );
};

export default AddProduct;
