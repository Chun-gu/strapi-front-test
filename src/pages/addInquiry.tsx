import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { addInquiry } from "@api";
import { IAddInquiryValues } from "@types";
import { useSession } from "next-auth/react";

const AddInquiry: NextPage = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<IAddInquiryValues>();

  const onSubmit = async (values: IAddInquiryValues) => {
    if (!session) {
      alert("로그인 필요");
      return;
    }

    const jwt = session.jwt as string;
    const author = session?.user?.id as number;
    const data = await addInquiry(jwt, author, values);
    if (data) alert("문의 등록 성공");
  };

  return (
    <>
      <h2>문의 등록</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productId">문의 대상 제품 id</label>
          <input type="text" id="productId" {...register("productId")} />
        </div>
        <div>
          <label htmlFor="content">문의 내용</label>
          <input type="text" id="content" {...register("content")} />
        </div>
        <button type="submit">문의 등록</button>
      </form>
    </>
  );
};

export default AddInquiry;
