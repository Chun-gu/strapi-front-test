import Image from "next/image";
import ImageWrapper from "@utils/ImageWrapper";
import { IComment } from "@types";
import { dateConverter } from "@utils/dateConverter";
import authorImg from "public/images/product-img-small-1.png";
import * as Styled from "./styled";

export default function CommentItem({ ...comment }: IComment) {
  const {
    author: { username },
    content,
    createdAt,
  } = comment;

  return (
    <Styled.CommentItem>
      <Styled.Author>
        <ImageWrapper width={4} height={4} borderRadius="50%">
          <Image
            src={authorImg}
            layout="fill"
            objectFit="cover"
            alt="작성자 사진"
          />
        </ImageWrapper>
        <span>{username}</span>
      </Styled.Author>
      <Styled.Content>{content}</Styled.Content>
      <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
    </Styled.CommentItem>
  );
}
