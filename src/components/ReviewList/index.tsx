import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getReviews } from "@api";
import { ReviewItem, Pagination } from "@components";
import { IReviewResponse } from "@types";
import * as Styled from "./styled";

export function ReviewList() {
  const router = useRouter();
  const { productId } = router.query;
  const { data: reviewsData } = useQuery<IReviewResponse>(
    ["getReviews", productId],
    () => getReviews(productId),
  );

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      {reviewsData && reviewsData?.reviews.length !== 0 ? (
        <>
          <Styled.ReviewList>
            <ul>
              {reviewsData.reviews
                .slice(offset, offset + itemsPerPage)
                .map((review) => (
                  <ReviewItem key={review.id} {...review} />
                ))}
            </ul>
          </Styled.ReviewList>
          {reviewsData && reviewsData.reviews.length > itemsPerPage && (
            <Pagination
              totalItemCount={reviewsData.reviews.length}
              itemsPerPage={itemsPerPage}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          )}
        </>
      ) : (
        <Styled.NoneYet>아직 리뷰가 없습니다.</Styled.NoneYet>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.params?.productId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getReviews", productId], () =>
    getReviews(productId),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
