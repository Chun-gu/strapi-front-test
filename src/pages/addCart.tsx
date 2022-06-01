import { NextPage } from "next";
import { useForm } from "react-hook-form";

const AddCart: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {};

  return (
    <>
      <h1>장바구니에 추가</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productId">제품 id</label>
          <input type="number" id="productId" {...register("productId")} />
        </div>
        <div>
          <label htmlFor="count">수량</label>
          <input type="number" id="count" {...register("count")} />
        </div>
        <div>
          <label htmlFor="cost">가격</label>
          <input type="number" id="cost" {...register("cost")} />
        </div>
        <button type="submit">추가</button>
      </form>
    </>
  );
};

export default AddCart;
