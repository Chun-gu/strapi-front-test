import { NextPage } from "next";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addProduct } from "@api";
import { IAddProductValues } from "@types";

const AddProduct: NextPage = () => {
  const { register, handleSubmit } = useForm<IAddProductValues>();

  const onSubmit = async (values: IAddProductValues) => {
    console.log("제품정보", values);
    try {
      const data = await addProduct(values);
      if (data) alert("제품 등록 성공");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { error: Error }).error
          .message;
        alert(`제품 등록 실패 \n ${errorMessage}`);
      } else {
        alert("등록 도중에 오류 발생");
      }
    }
  };

  return (
    <>
      <h1>제품 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productName">제품명</label>
          <input type="text" id="productName" {...register("productName")} />
        </div>
        <div>
          <label htmlFor="categories">카테고리</label>
          <select id="categories" {...register("categories")}>
            <option value="1">쓴맛</option>
            <option value="2">신맛</option>
            <option value="3">단맛</option>
          </select>
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
        <div>
          <label htmlFor="images">제품 이미지</label>
          <input type="file" id="images" {...register("images")} />
        </div>
        <button type="submit">상품 등록</button>
      </form>
    </>
  );
};

export default AddProduct;
