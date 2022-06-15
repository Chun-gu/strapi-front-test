import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import PlusIcon from 'public/images/icon-plus-line.svg';
import MinusIcon from 'public/images/icon-minus-line.svg';
import router from 'next/router';
import * as Buttons from '../Buttons';
import * as Styled from './styled';

interface IPriceCalculatorProps {
  productId: string | string[] | undefined;
  price: number;
  stock: number;
}

export function PriceCalculator({
  productId,
  price,
  stock,
}: IPriceCalculatorProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const totalPrice = price * totalCount;

  const increaseCount = () => {
    if (totalCount === stock) {
      return;
    }
    setTotalCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    if (totalCount === 1) {
      return;
    }
    setTotalCount((prevCount) => prevCount - 1);
  };

  const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const count = +e.currentTarget.value;
    if (count > stock || count < 1) {
      return;
    }
    setTotalCount(count);
  };

  const purchase = () => {
    // 장바구니에 추가하는 로직 추가 예정
    router.push(
      {
        pathname: '/order',
        query: {
          productId,
          totalCount,
          totalPrice,
        },
      },
      '/order',
    );
  };

  const addToCart = () => {
    // 장바구니에 추가하는 로직
    setIsAddedToCart(true);
  };

  const continueToShop = () => {
    setIsAddedToCart(false);
  };

  return (
    <>
      <Styled.Count>
        <Styled.Counter>
          <Styled.CounterButton onClick={decreaseCount}>
            <MinusIcon />
          </Styled.CounterButton>
          <Styled.CounterInput
            type="number"
            name="totalCount"
            id="totalCount"
            value={totalCount.toString()}
            onChange={changeCount}
          />
          <Styled.CounterButton onClick={increaseCount}>
            <PlusIcon />
          </Styled.CounterButton>
        </Styled.Counter>
      </Styled.Count>
      <Styled.CountNPrice>
        <span>총 상품 금액</span>
        <div>
          <Styled.TotalCount>
            총 수량 <span>{totalCount}</span>개
          </Styled.TotalCount>
          <Styled.TotalPrice>
            <span>{totalPrice.toLocaleString()}</span>원
          </Styled.TotalPrice>
        </div>
      </Styled.CountNPrice>
      <Styled.ButtonsWrapper>
        <Buttons.Custom
          width={41.6}
          height={6}
          fontSize={1.8}
          color="green"
          disabled={false}
          onClick={purchase}
        >
          바로 구매
        </Buttons.Custom>
        <Buttons.Custom
          width={20}
          height={6}
          fontSize={1.8}
          color="dark"
          disabled={false}
          onClick={addToCart}
        >
          장바구니
        </Buttons.Custom>
        {isAddedToCart && (
          <Styled.Tooltip>
            <p>장바구니에 담았습니다.</p>
            <Link href="/cart">
              <a>
                <Buttons.Custom
                  width={17}
                  height={4}
                  fontSize={1.4}
                  color="green"
                  disabled={false}
                >
                  장바구니로 이동
                </Buttons.Custom>
              </a>
            </Link>
            <Buttons.Custom
              width={17}
              height={4}
              fontSize={1.4}
              color="green"
              disabled={false}
              onClick={continueToShop}
            >
              쇼핑 계속하기
            </Buttons.Custom>
          </Styled.Tooltip>
        )}
      </Styled.ButtonsWrapper>
    </>
  );
}
