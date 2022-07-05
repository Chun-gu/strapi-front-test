import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getInquiries } from "@api";
import { Buttons, InquiryItem, Pagination } from "@components";
import { InquiryListLoader } from "../Loader";
import { useModal } from "@hooks";
import { NoneYet } from "@styles/GlobalStyle";
import { IApiResponse, IInquiry } from "@types";
import * as Styled from "./styled";

const InquiryList = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: session } = useSession();

  const addInquiryModal = useModal({ modalId: "addInquiry" });
  const toLoginModal = useModal({ modalId: "toLogin" });

  const limit = 5;
  const [page, setPage] = useState(1);
  const { isLoading, data: inquiries } = useQuery<IApiResponse<IInquiry[]>>(
    ["getInquiries", { productId, page }],
    () => getInquiries(productId, limit, page),
  );

  const writeInquiry = () => {
    if (session) {
      addInquiryModal.open();
    } else {
      toLoginModal.open();
    }
  };

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
        onClick={writeInquiry}
      >
        문의 작성
      </Buttons.Custom>
      <Styled.Field>
        <span aria-hidden="true">답변상태</span>
        <span aria-hidden="true">문의</span>
        <span aria-hidden="true">작성자</span>
        <span aria-hidden="true">작성일</span>
      </Styled.Field>
      {isLoading && <InquiryListLoader />}
      {!isLoading && inquiries?.data?.length === 0 && (
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
              totalPageCount={inquiries.pagination.pageCount}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Styled.InquirySection>
  );
};

export default InquiryList;
