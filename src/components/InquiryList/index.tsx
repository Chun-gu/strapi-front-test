import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getInquiries } from "@api";
import { InquiryItem, Pagination } from "@components";
import { IInquiriesResponse } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import * as Styled from "./styled";

export function InquiryList() {
  const router = useRouter();
  const { productId } = router.query;

  const { data } = useQuery<IInquiriesResponse>(
    ["getInquiries", productId],
    () => getInquiries(productId),
  );

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      {data && data?.inquiries.length !== 0 ? (
        <>
          <Styled.List>
            <li>
              <span aria-hidden="true">답변상태</span>
              <span aria-hidden="true">질문</span>
              <span aria-hidden="true">작성자</span>
              <span aria-hidden="true">작성일</span>
            </li>
            {data.inquiries
              .slice(offset, offset + itemsPerPage)
              .map((inquiry) => (
                <InquiryItem key={`inquiry-${inquiry.id}`} {...inquiry} />
              ))}
          </Styled.List>
          {data.inquiries.length > itemsPerPage && (
            <Pagination
              totalItemCount={data.inquiries.length}
              itemsPerPage={itemsPerPage}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          )}
        </>
      ) : (
        <NoneYet>아직 문의가 없습니다.</NoneYet>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.params?.productId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getInquiries", productId], () =>
    getInquiries(productId),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default InquiryList;
