import { NextPage } from "next";
import { useForm } from "react-hook-form";

const AddOrder: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {};

  return (
    <>
      <h1>주문 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="orderer">주문자</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="receipient">수령인</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="addresse">수령지</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="status">주문상태</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="courier">배송사</label>
          <input type="text" />
        </div>
      </form>
    </>
  );
};

export default AddOrder;
