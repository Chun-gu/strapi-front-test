import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getReviews } from "@api";
import { ReviewItem, Pagination, Buttons } from "@components";
import { ReviewListLoader } from "../Loader";
import { IApiResponse, IReview } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import { useModal } from "@hooks";
import * as Styled from "./styled";

const ReviewList = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: session } = useSession();

  const addReviewModal = useModal({ modalId: "addReview" });
  const toLoginModal = useModal({ modalId: "toLogin" });

  const writeReview = () => {
    if (session) {
      addReviewModal.open();
    } else {
      toLoginModal.open();
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
