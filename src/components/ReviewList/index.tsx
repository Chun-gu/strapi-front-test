import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getReviews } from "@api";
import { ReviewItem, Pagination, Buttons } from "@components";
import { ReviewListLoader } from "../Loader";
import { IApiResponse, IReview } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import { useModal } from "@hooks";
import * as Styled from "./styled";
import { AddReviewModal, AlertModal } from "../Modals";

const ReviewList = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: session } = useSession();
  const addReviewModal = useModal("addReviewModal");
  const toLoginModal = useModal("toLoginModal");

  const onClose = () => {
    console.log("로그인으로!");
    router.push("/login");
  };

  const writeReview = () => {
    if (session) {
      addReviewModal.open();
    } else {
      toLoginModal.addText("로그인 페이지로 이동하시겠습니까?");
      toLoginModal.open();
    }
  };

  const [page, setPage] = useState(1);
  const limit = 5;
  const { isLoading, data: reviews } = useQuery<IApiResponse<IReview[]>>(
    ["getReviews", { productId, page }],
    () => getReviews(productId, limit, page),
  );

  useEffect(() => {
    console.log("reviewList 마운트");
    return () => {
      console.log("reviewList 언마운트");
    };
  }, []);

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
      {toLoginModal.modal.isOpen && (
        <AlertModal modalId="toLoginModal" onClose={onClose} />
      )}
      {addReviewModal.modal.isOpen && <AddReviewModal productId={productId} />}
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
                page={page}
                setPage={setPage}
                totalPageCount={reviews.pagination.pageCount}
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
