import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getReviews } from "@api";
import { ReviewItem, Pagination } from "@components";
import { IApiResponse, IReview } from "@types";
import * as Styled from "./styled";

export function ReviewList() {
  const router = useRouter();
  const { productId } = router.query;
  const { data: reviews } = useQuery<IApiResponse<IReview[]>>(
    ["getReviews", productId],
    () => getReviews(productId),
  );

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      {reviews && reviews?.data.length !== 0 ? (
        <>
          <Styled.ReviewList>
            <ul>
              {reviews?.data
                .slice(offset, offset + itemsPerPage)
                .map((review) => (
                  <ReviewItem key={review.id} {...review} />
                ))}
            </ul>
          </Styled.ReviewList>
          {reviews && reviews.data.length > itemsPerPage && (
            <Pagination
              totalItemCount={reviews.data.length}
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
