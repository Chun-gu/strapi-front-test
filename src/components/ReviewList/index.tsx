import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getReviews } from "@api";
import { ReviewItem, Pagination, Buttons } from "@components";
import { ReviewListLoader } from "../Loader";
import { IApiResponse, IReview } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import * as Styled from "./styled";

import { modalSelectorFamily, useModal } from "src/atoms/modalAtom";
import ConfirmModal from "../Modals/ConfirmModal";
import { useSetRecoilState } from "recoil";
import AlertModal from "../Modals/AlertModal";
import AddReviewModal from "../Modals/AddReviewModal";
import { useSession } from "next-auth/react";

const ReviewList = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: session } = useSession();
  // const confirmModal = useModal("confirmModal");
  // const setIsOpen = useSetRecoilState(modalsSelectorFamily("confirmModal"));
  const addReviewModal = useModal("addReviewModal");
  const toLoginModal = useModal("toLoginModal");

  const onClose = () => {
    console.log("로그인으로!");
    router.push("/login");
  };
  const writeReview = () => {
    if (session) {
      addReviewModal.openModal();
    } else {
      toLoginModal.addText("로그인이 필요합니다. 로그인 하시겠습니까?");
      toLoginModal.openModal();
    }
  };

  const [page, setPage] = useState(1);
  const limit = 5;
  const { isLoading, data: reviews } = useQuery<IApiResponse<IReview[]>>(
    ["getReviews", { productId, page }],
    () => getReviews(productId, limit, page),
  );

  if (isLoading) return <ReviewListLoader />;

  return (
    <Styled.ReviewSection>
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
        onClick={writeReview}
      >
        리뷰 작성
      </Buttons.Custom>
      <AlertModal onClose={onClose} />
      <AddReviewModal productId={productId} />
      {reviews && reviews?.data?.length > 0 ? (
        <>
          <Styled.ReviewList>
            {reviews.data.map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </Styled.ReviewList>
          {reviews.pagination.total > limit && (
            <Styled.PaginationWrapper>
              <Pagination
                totalItemCount={reviews.pagination.total}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </Styled.PaginationWrapper>
          )}
        </>
      ) : (
        <Styled.NoneYetWrapper>
          <NoneYet>아직 리뷰가 없습니다.</NoneYet>
        </Styled.NoneYetWrapper>
      )}
    </Styled.ReviewSection>
  );
};

export default ReviewList;
