import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getReviews } from "@api";
import { ReviewItem, Pagination, Buttons } from "@components";
import { ReviewListLoader } from "../Loader";
import { IApiResponse, IReview } from "@types";
import { NoneYet } from "@styles/GlobalStyle";
import * as Styled from "./styled";

export function ReviewList() {
  const router = useRouter();
  const { productId } = router.query;

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
      >
        리뷰 작성
      </Buttons.Custom>
      {reviews && reviews?.data.length > 0 ? (
        <>
          <Styled.ReviewList>
            {reviews.data.map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </Styled.ReviewList>
          {reviews.pagination.total > limit && (
            <Pagination
              totalItemCount={reviews.pagination.total}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      ) : (
        <Styled.NoneYetWrapper>
          <NoneYet>아직 리뷰가 없습니다.</NoneYet>
        </Styled.NoneYetWrapper>
      )}
    </Styled.ReviewSection>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const productId = ctx.params?.productId;
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["getReviews", productId], () =>
//     getReviews(productId),
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
