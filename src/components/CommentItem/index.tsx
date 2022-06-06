import Image from 'next/image';
import ImageWrapper from '@utils/ImageWrapper';
import { IComment } from '@shared/types';
import { dateConverter } from '@utils/dateConverter';
import authorImg from 'public/images/product-img-small-1.png';
import * as Styled from './styled';

export function CommentItem({
  user: { nickname },
  content,
  createdAt,
}: IComment) {
  return (
    <Styled.CommentItem>
      <Styled.Author>
        <ImageWrapper width="4rem" height="4rem" imgStyle="border-radius: 50%;">
          <Image src={authorImg} layout="fill" />
        </ImageWrapper>
        <span>{nickname}</span>
      </Styled.Author>
      <Styled.Content>{content}</Styled.Content>
      <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
    </Styled.CommentItem>
  );
}
