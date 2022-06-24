import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getInquiries } from "@api";
import { Buttons, InquiryItem, Pagination } from "@components";
import InquiryListLoader from "../Loader/InquiryListLoader";
import { IApiResponse, IInquiry } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import * as Styled from "./styled";

export function InquiryList() {
  const router = useRouter();
  const { productId } = router.query;

  const limit = 5;
  const [page, setPage] = useState(1);
  const { isLoading, data: inquiries } = useQuery<IApiResponse<IInquiry[]>>(
    ["getInquiries", { productId, page }],
    () => getInquiries(productId, limit, page),
  );

  return (
    <Styled.InquirySection>
      <Buttons.Custom
        width={10}
        height={4}
        color="green"
        fontSize={1.6}
        disabled={false}
        type="button"
        position="absolute"
        bottom={0}
        right={0}
      >
        문의 작성
      </Buttons.Custom>
      <Styled.Field>
        <span aria-hidden="true">답변상태</span>
        <span aria-hidden="true">질문</span>
        <span aria-hidden="true">작성자</span>
        <span aria-hidden="true">작성일</span>
      </Styled.Field>
      {isLoading && <InquiryListLoader />}
      {!isLoading && inquiries?.data.length === 0 && (
        <Styled.NoneYetWrapper>
          <NoneYet>아직 문의가 없습니다.</NoneYet>
        </Styled.NoneYetWrapper>
      )}
      {!isLoading && inquiries && inquiries?.data.length > 0 && (
        <>
          <Styled.List>
            <>
              {inquiries.data.map((inquiry) => (
                <InquiryItem key={`inquiry-${inquiry.id}`} {...inquiry} />
              ))}
            </>
          </Styled.List>
          {inquiries.pagination.total > limit && (
            <Pagination
              totalItemCount={inquiries.pagination.total}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Styled.InquirySection>
  );
}

export default InquiryList;
