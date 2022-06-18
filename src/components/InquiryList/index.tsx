import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getInquiries } from "@api";
import { InquiryItem, Pagination } from "@components";
import { IApiResponse, IInquiry } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import * as Styled from "./styled";

export function InquiryList() {
  const router = useRouter();
  const { productId } = router.query;

  const { data: inquiries } = useQuery<IApiResponse<IInquiry[]>>(
    ["getInquiries", productId],
    () => getInquiries(productId),
  );

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      {inquiries && inquiries?.data.length !== 0 ? (
        <>
          <Styled.List>
            <li>
              <span aria-hidden="true">답변상태</span>
              <span aria-hidden="true">질문</span>
              <span aria-hidden="true">작성자</span>
              <span aria-hidden="true">작성일</span>
            </li>
            {inquiries.data
              .slice(offset, offset + itemsPerPage)
              .map((inquiry) => (
                <InquiryItem key={`inquiry-${inquiry.id}`} {...inquiry} />
              ))}
          </Styled.List>
          {inquiries.data.length > itemsPerPage && (
            <Pagination
              totalItemCount={inquiries.data.length}
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
