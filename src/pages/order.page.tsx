import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ImageWrapper from '@utils/ImageWrapper';
import DefaultContainerPage from 'src/components/common/DefaultContainer';
import { Buttons, Postcode } from '@components';
import * as Styled from 'styled-component'

interface IFormValues {
  orderer: string;
  ordererMobile1: string;
  ordererMobile2: string;
  ordererMobile3: string;
  email: string;
  recipient: string;
  recipientMobile1: string;
  recipientMobile2: string;
  recipientMobile3: string;
  zipcode: string;
  address: string;
  detailedAddress: string;
  message: string;
  payMethod: string;
  agreement: boolean;
}

export default function Order() {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IFormValues | FieldValues>({ mode: 'onChange' });
  const openPostcode = () => {
    setIsPostcodeOpen(true);
  };
  const onSubmit = async () => {
    const {
      orderer,
      ordererMobile1,
      ordererMobile2,
      ordererMobile3,
      email,
      recipient,
      recipientMobile1,
      recipientMobile2,
      recipientMobile3,
      zipcode,
      address,
      detailedAddress,
      message,
      payMethod
    } = getValues();
    const ordererMobile = `${ordererMobile1}-${ordererMobile2}-${ordererMobile3}`;
    const recipientMobile = `${recipientMobile1}-${recipientMobile2}-${recipientMobile3}`;
    const fullAddress = `${zipcode}) ${address} ${detailedAddress}`;
    console.log(
      orderer,
      ordererMobile,
      email,
      recipient,
      recipientMobile,
      fullAddress,
      message,
      payMethod
    );
  };

  return (
    <DefaultContainerPage>
      <Styled.Container>
        <header>
          <h1>주문/결제하기</h1>
        </header>
        <section>
          <h2 className="sr-only">주문 제품 목록</h2>
          <Styled.OrderList>
            <Styled.Field aria-hidden="true">
              <span>상품정보</span>
              <span>할인</span>
              <span>배송비</span>
              <span>주문금액</span>
            </Styled.Field>
            <Styled.Product>
              <span className="sr-only">상품정보</span>
              <Styled.Info>
                <ImageWrapper
                  width="10.4rem"
                  height="10.4rem"
                  imgStyle="border-radius: 1rem;"
                >
                  <Image src={productImg} layout="fill" />
                </ImageWrapper>
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <span>수량: 1개</span>
                </div>
              </Styled.Info>
              <span className="sr-only">할인</span>
              <span>15%</span>
              <span className="sr-only">배송비</span>
              <span>무료배송</span>
              <span className="sr-only">주문금액</span>
              <span>17,500원</span>
            </Styled.Product>
          </Styled.OrderList>
          <Styled.TotalPrice>
            총 주문금액 <span>46,500원</span>
          </Styled.TotalPrice>
        </section>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Shipment>
            <h2>배송정보</h2>
            <h3>주문자 정보</h3>
            <Styled.InputWrapper>
              <label htmlFor="orderer">이름</label>
              <Styled.MInput
                id="orderer"
                maxLength={10}
                {...register('orderer', {
                  required: true,
                  minLength: 2
                })}
              />
              {errors.orderer?.type === 'required' && (
                <Styled.Error>
                  주문자 이름을 입력해 주시기 바랍니다.
                </Styled.Error>
              )}
              {errors.orderer?.type === 'minLength' && (
                <Styled.Error>이름은 2자 이상이어야 합니다.</Styled.Error>
              )}
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <label htmlFor="ordererMobile">휴대폰</label>
              <Styled.MobileWrapper>
                <Styled.SInput
                  type="tel"
                  id="ordererMobile"
                  maxLength={3}
                  {...register('ordererMobile1', {
                    required: true,
                    minLength: 2,
                    pattern: /[0-9]+/
                  })}
                />
                &#45;
                <Styled.SInput
                  type="tel"
                  id="ordererMobile"
                  maxLength={4}
                  {...register('ordererMobile2', {
                    required: true,
                    minLength: 3,
                    pattern: /[0-9]+/
                  })}
                />
                &#45;
                <Styled.SInput
                  type="tel"
                  id="ordererMobile"
                  maxLength={4}
                  {...register('ordererMobile3', {
                    required: true,
                    minLength: 4,
                    pattern: /[0-9]+/
                  })}
                />
              </Styled.MobileWrapper>
              {(errors.ordererMobile1 ||
                errors.ordererMobile2 ||
                errors.ordererMobile3) && (
                <Styled.Error>
                  휴대폰 번호를 확인해 주시기 바랍니다.
                </Styled.Error>
              )}
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <label htmlFor="email">이메일</label>
              <Styled.MInput
                type="email"
                id="email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
              />
              {errors.email?.type === 'required' && (
                <Styled.Error>
                  이메일 주소를 입력해 주시기 바랍니다.
                </Styled.Error>
              )}
              {errors.email?.type === 'pattern' && (
                <Styled.Error>
                  이메일 형식을 확인해 주시기 바랍니다.
                </Styled.Error>
              )}
            </Styled.InputWrapper>
            <h3>배송지 정보</h3>
            <Styled.InputWrapper>
              <label htmlFor="recipient">수령인</label>
              <Styled.MInput
                type="text"
                id="recipient"
                maxLength={10}
                {...register('recipient', { required: true, minLength: 2 })}
              />
              {errors.recipient?.type === 'required' && (
                <Styled.Error>
                  수령인 이름을 입력해 주시기 바랍니다.
                </Styled.Error>
              )}
              {errors.recipient?.type === 'minLength' && (
                <Styled.Error>이름은 2자 이상이어야 합니다.</Styled.Error>
              )}
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <label htmlFor="recepientMobile">휴대폰</label>
              <Styled.MobileWrapper>
                <Styled.SInput
                  type="tel"
                  id="recipientMobile"
                  maxLength={3}
                  {...register('recipientMobile1', {
                    required: true,
                    minLength: 2,
                    pattern: /[0-9]+/
                  })}
                />
                &#45;
                <Styled.SInput
                  type="tel"
                  id="recipientMobile"
                  maxLength={4}
                  {...register('recipientMobile2', {
                    required: true,
                    minLength: 3,
                    pattern: /[0-9]+/
                  })}
                />
                &#45;
                <Styled.SInput
                  type="tel"
                  id="recipientMobile"
                  maxLength={4}
                  {...register('recipientMobile3', {
                    required: true,
                    minLength: 4,
                    pattern: /[0-9]+/
                  })}
                />
              </Styled.MobileWrapper>
              {(errors.recipientMobile1 ||
                errors.recipientMobile2 ||
                errors.recipientMobile3) && (
                <Styled.Error>
                  휴대폰 번호를 확인해 주시기 바랍니다.
                </Styled.Error>
              )}
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <label htmlFor="address">배송주소</label>
              <Styled.Address>
                <div>
                  <Styled.SInput
                    type="text"
                    id="address"
                    {...register('zipcode', { required: true })}
                  />
                  <Buttons.Custom
                    type="button"
                    width={15.4}
                    height={4}
                    color="green"
                    fontSize={1.6}
                    disabled={false}
                    onClick={openPostcode}
                  >
                    우편번호 조회
                  </Buttons.Custom>
                  {errors.zipcode && (
                    <Styled.Error>
                      우편번호를 입력해 주시기 바랍니다.
                    </Styled.Error>
                  )}
                  {isPostcodeOpen && (
                    <Postcode
                      setIsPostcodeOpen={setIsPostcodeOpen}
                      setValue={setValue}
                    />
                  )}
                </div>
                <div>
                  <Styled.LInput
                    type="text"
                    id="address"
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <Styled.Error>주소를 입력해 주시기 바랍니다.</Styled.Error>
                  )}
                </div>
                <div>
                  <Styled.LInput
                    type="text"
                    id="address"
                    {...register('detailedAddress', { required: true })}
                  />
                  {errors.detailedAddress && (
                    <Styled.Error>
                      상세 주소를 입력해 주시기 바랍니다.
                    </Styled.Error>
                  )}
                </div>
              </Styled.Address>
            </Styled.InputWrapper>
            <Styled.InputWrapper>
              <label htmlFor="message">배송 메시지</label>
              <Styled.LInput
                type="text"
                id="message"
                maxLength={80}
                {...register('message')}
              />
            </Styled.InputWrapper>
          </Styled.Shipment>
          <Styled.Payment>
            <h2>
              결제 수단
              {errors.payMethod && (
                <Styled.Error>결제 수단을 선택해 주시기 바랍니다.</Styled.Error>
              )}
            </h2>
            <div>
              <label htmlFor="creditCard">
                <input
                  type="radio"
                  id="creditCard"
                  value="creditCard"
                  {...register('payMethod', { required: true })}
                />
                신용/체크카드
              </label>
              <label htmlFor="deposit">
                <input
                  type="radio"
                  id="deposit"
                  value="deposit"
                  {...register('payMethod', { required: true })}
                />
                무통장 입금
              </label>
              <label htmlFor="mobilePay">
                <input
                  type="radio"
                  id="mobilePay"
                  value="mobilePay"
                  {...register('payMethod', { required: true })}
                />
                휴대폰 결제
              </label>
              <label htmlFor="naverPay">
                <input
                  type="radio"
                  id="naverPay"
                  value="naverPay"
                  {...register('payMethod', { required: true })}
                />
                네이버페이
              </label>
              <label htmlFor="kakaoPay">
                <input
                  type="radio"
                  id="kakaoPay"
                  value="kakaoPay"
                  {...register('payMethod', { required: true })}
                />
                카카오페이
              </label>
            </div>
          </Styled.Payment>
          <Styled.PayInfo>
            <h2>최종결제 정보</h2>
            <Styled.InfoWrapper>
              <dl>
                <div>
                  <dt>&#45; 상품금액</dt>
                  <dd>
                    <span>46,500</span>원
                  </dd>
                </div>
                <div>
                  <dt>&#45; 할인금액</dt>
                  <dd>
                    <span>0</span>원
                  </dd>
                </div>
                <div>
                  <dt>&#45; 배송비</dt>
                  <dd>
                    <span>0</span>원
                  </dd>
                </div>
                <div>
                  <dt>&#45; 결제금액</dt>
                  <dd>
                    <span>46,500</span>원
                  </dd>
                </div>
              </dl>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="agreement"
                    {...register('agreement', { required: true })}
                  />
                  <label htmlFor="agreement">
                    주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                  </label>
                  {errors.agreement && (
                    <Styled.Error>동의해주시기 바랍니다.</Styled.Error>
                  )}
                </div>
                <Buttons.Custom
                  type="submit"
                  width={22}
                  height={6.8}
                  color="green"
                  disabled={!isValid}
                  fontSize={2.4}
                >
                  결제하기
                </Buttons.Custom>
              </div>
            </Styled.InfoWrapper>
          </Styled.PayInfo>
        </Styled.Form>
      </Styled.Container>
    </DefaultContainerPage>
  );
}
