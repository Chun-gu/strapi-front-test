import Instagram from 'public/images/icon-instagram.svg';
import Facebook from 'public/images/icon-facebook.svg';
import Youtube from 'public/images/icon-youtube.svg';
import * as Styled from './styled';

const Footer = () => {
  return (
    <Styled.Footer>
      <Styled.Container>
        <Styled.UpperSection>
          <Styled.LinkList>
            <li>원두샵 소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>전자금융거래약관</li>
            <li>청소년보호정책</li>
            <li>제휴문의</li>
          </Styled.LinkList>
          <Styled.SocialList>
            <li>
              <span className="sr-only">인스타그램 방문하기</span>
              <Instagram />
            </li>
            <li>
              <span className="sr-only">페이스북 방문하기</span>
              <Facebook />
            </li>
            <li>
              <span className="sr-only">유튜브 방문하기</span>
              <Youtube />
            </li>
          </Styled.SocialList>
        </Styled.UpperSection>
        <Styled.LowerSection>
          <dl>
            <div>
              <dt className="sr-only">업체명</dt>
              <Styled.CompanyName>(주)WONDU MARKET</Styled.CompanyName>
            </div>
            <div>
              <dt className="sr-only">주소</dt>
              <dd>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</dd>
            </div>
            <div>
              <dt>사업자 번호&nbsp;:&nbsp;</dt>
              <dd>000-0000-0000 통신판매업</dd>
            </div>
            <div>
              <dt>대표&nbsp;:&nbsp;</dt>
              <dd>이원두</dd>
            </div>
          </dl>
        </Styled.LowerSection>
      </Styled.Container>
    </Styled.Footer>
  );
};

export default Footer;
