import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  ReviewList,
  TabMenu,
  PriceCalculator,
  ProductImage,
  InquiryList
} from '@components';
import DefaultContainerPage from 'src/components/common';
import api from '@utils/api';
import { IProduct, IReview, IInquiry } from '@shared/types';
import * as Styled from './styled';

export default function Details() {
  const router = useRouter();
  const { productId } = router.query as { productId: string };

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();
  const [reviews, setReviews] = useState<IReview[]>();
  const [inquiries, setInquiries] = useState<IInquiry[]>();
  const { data: session, status } = useSession();
  console.log(session, status);

  const sectionRefs = useRef<HTMLElement[]>([]);

  const { productName, price, discountRate, stock, description } = {
    ...product
  } as IProduct;

  const finalPrice =
    discountRate === 0
      ? price
      : Math.round((price * (100 - discountRate)) / 1000) * 10;
  const images = [
    '/images/product-img-small-1.png',
    '/images/product-img-small-2.png',
    '/images/product-img-small-3.png',
    '/images/product-img-small-4.png',
    '/images/product-img-small-5.png'
  ];

  const storeRef = useCallback((elem: HTMLElement, index: number) => {
    sectionRefs.current[index] = elem;
  }, []);

  const getData = useCallback(async () => {
    try {
      const promises = await Promise.allSettled([
        api.get(`/product/${productId}`),
        api.get(`product/review/${productId}`),
        api.get(`product/inquiry/${productId}`)
      ]);

      interface IResponse {
        success: boolean;
        data: IProduct | IReview[] | IInquiry[];
      }

      const responses = (
        promises.filter(
          (promise) => promise.status === 'fulfilled'
        ) as PromiseFulfilledResult<IResponse>[]
      ).map((promise) => promise.value);

      // if (!response) {
      //   const error = (
      //     promises.find((promise) => promise.status === 'rejected') as
      //       | PromiseRejectedResult
      //       | undefined
      //   )?.reason;
      //   throw new Error(error);
      // }

      const [productData, reviewsData, inquiriesData] = responses.map(
        (response) => (response.success ? response.data : undefined)
      ) as [IProduct, IReview[], IInquiry[]];

      setProduct(productData);
      setReviews(reviewsData);
      setInquiries(inquiriesData);
      setIsLoading(false);
    } catch (error) {
      throw new Error(`에러: ${error}`);
    }
  }, [productId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <DefaultContainerPage>
      <Styled.Container>
        {isLoading ? (
          'Loading'
        ) : (
          <>
            <Styled.ProductHeader>
              <ProductImage productImages={images} />
              <Styled.ProductSummary>
                <div>
                  <Styled.ProductTitle>{productName}</Styled.ProductTitle>
                  <Styled.ProductPrice>
                    {+discountRate !== 0 ? (
                      <>
                        <Styled.FinalPrice>
                          {finalPrice.toLocaleString()}
                        </Styled.FinalPrice>
                        원
                        <Styled.OriginalPrice>
                          {price.toLocaleString()}원
                        </Styled.OriginalPrice>
                        <Styled.DiscountRate>
                          {discountRate}%
                        </Styled.DiscountRate>
                      </>
                    ) : (
                      <>
                        <Styled.FinalPrice>
                          {price.toLocaleString()}
                        </Styled.FinalPrice>
                        원
                      </>
                    )}
                  </Styled.ProductPrice>
                </div>
                <div>
                  <Styled.Shipment>택배배송 / 무료배송</Styled.Shipment>
                  <PriceCalculator
                    productId={productId}
                    price={finalPrice}
                    stock={stock}
                  />
                </div>
              </Styled.ProductSummary>
            </Styled.ProductHeader>
            <Styled.ProductBody>
              <TabMenu sectionRefs={sectionRefs} />
              <Styled.TabSection ref={(elem: HTMLElement) => storeRef(elem, 0)}>
                <h2>제품 상세 정보</h2>
                <p>{description}</p>
              </Styled.TabSection>
              <Styled.TabSection ref={(elem: HTMLElement) => storeRef(elem, 1)}>
                <h2>리뷰</h2>
                {!reviews || reviews.length === 0 ? (
                  <Styled.NoneYet>아직 리뷰가 없습니다.</Styled.NoneYet>
                ) : (
                  <ReviewList reviews={reviews} />
                )}
              </Styled.TabSection>
              <Styled.TabSection ref={(elem: HTMLElement) => storeRef(elem, 2)}>
                <h2>Q&amp;A</h2>
                {!inquiries || inquiries.length === 0 ? (
                  <Styled.NoneYet>아직 문의가 없습니다.</Styled.NoneYet>
                ) : (
                  <InquiryList inquiries={inquiries} />
                )}
              </Styled.TabSection>
              <Styled.TabSection ref={(elem: HTMLElement) => storeRef(elem, 3)}>
                <h2>교환/반품 정보</h2>
                <h3>배송안내</h3>
                <p>
                  신선한 원두 공급을 위해 매일 아침 전일 주문을 확인하고
                  로스팅을 시작하며 오후 발송됩니다.
                </p>
                <p>
                  토,일 배송휴무와 휴일 및 공휴일 주문 건은 커피의 신선도를 위해
                  다음 영업일에 발송됩니다.
                </p>
                <br />
                <ol>
                  <li>주문하신 상품은 1~3일 후 받아보실 수 있습니다.</li>
                  <li>
                    일부 상품은 재고 여부와 천재지변에 의해 배송지연 될 수
                    있습니다.
                  </li>
                  <li>제주, 도서산간 지역은 추가 비용 3,000원이 부과됩니다.</li>
                  <li>상품 발송 후 배송지 변경이 어려울 수 있습니다.</li>
                </ol>
                <br />
                <h3>교환 / 반품 불가능한 경우</h3>
                <ol>
                  <li>
                    커피는 주문 후 제조식품으로 교환 및 환불 불가 상품입니다.
                  </li>
                  <li>
                    고객 단순 변심과 옵션사항의 선택을 잘못한 경우 교환 및
                    환불이 불가합니다.
                  </li>
                  <li>고객의 책임이 있는 사유로 제품이 훼손된 경우</li>
                  <li>
                    소비자 보호에 관한 법률이 정하는 소비자 청약 철회 제한에
                    해당하는 경우
                  </li>
                  <li>상품의 가치가 상실된 경우</li>
                </ol>
                <br />
                <h3>교환 / 반품 안내</h3>
                <ol>
                  <li>교환 / 반품 시 판매자 고객센터로 문의 바랍니다.</li>
                  <li>
                    고객의 변심에 의한 교환은 7일 이내 가능하며, 반송료는
                    고객부담입니다. (커피용품에 한함)
                  </li>
                  <li>
                    무료배송 상품을 교환, 반품하실 경우 최초 배송비를 포함한
                    왕복 배송비 5,000원을 부담하셔야 합니다.
                  </li>
                  <li>반품 시 CJ대한통운 택배를 이용합니다.</li>
                </ol>
              </Styled.TabSection>
            </Styled.ProductBody>
          </>
        )}
      </Styled.Container>
    </DefaultContainerPage>
  );
}
