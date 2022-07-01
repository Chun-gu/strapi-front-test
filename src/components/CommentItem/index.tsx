import Image from "next/image";
import { IComment } from "@types";
import { ImageWrapper, dateConverter } from "@utils";
import authorImg from "public/assets/images/img-user-fallback.png";
import * as Styled from "./styled";

const CommentItem = ({ ...comment }: IComment) => {
  const { author, content, createdAt } = comment;

  return (
    <Styled.CommentItem>
      <Styled.Author>
        <ImageWrapper width={4} height={4} borderRadius="50%">
          <Image
            src={authorImg}
            layout="fill"
            objectFit="cover"
            alt="작성자 프로필 이미지"
          />
        </ImageWrapper>
        <span>{author.username}</span>
      </Styled.Author>
      <Styled.Content>{content}</Styled.Content>
      <Styled.Date>{dateConverter(createdAt)}</Styled.Date>
    </Styled.CommentItem>
  );
};

export default CommentItem;
