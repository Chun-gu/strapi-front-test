import { useSession } from 'next-auth/react';
import { CustomSession } from '@pages/api/auth/[...nextauth]';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import api from '@utils/api';
import ImageWrapper from '@utils/ImageWrapper';
import { IComment } from '@shared/types';
import { CommentItem } from '../CommentItem';
import * as Buttons from '../Buttons';
import { Pagination } from '../Pagination';
// import dummyCommentData from './dummyCommentsData.json';
import * as Styled from './styled';

interface ICommentListProps {
  reviewId: string;
}

export function CommentList({ reviewId }: ICommentListProps) {
  const { data: session } = useSession();
  const { id: userId, nickname } = (session as CustomSession).user;
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isValid }
  } = useForm<{ comment: string }>({ mode: 'onChange' });

  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;
  const [isLoading, setIsLoading] = useState(true);
  const [commentsData, setCommentsData] = useState<IComment[]>();

  const getData = useCallback(async () => {
    const { data } = await api.get(`/review/comment/${reviewId}`);
    console.log('comment', data);
    setCommentsData(data);
    setIsLoading(false);
  }, [reviewId]);

  const onSubmit = async () => {
    const { comment: content } = getValues();
    const { success, message } = await api.post('/comment', {
      review: reviewId,
      user: userId,
      content
    });
    if (success) {
      reset();
      getData();
    } else {
      console.error(message);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Styled.CommentSection>
      {isLoading ? (
        'Loading'
      ) : (
        <>
          {commentsData && commentsData!.length > 0 && (
            <>
              <ul>
                {commentsData
                  .slice(offset, offset + itemsPerPage)
                  .map((comment) => (
                    <CommentItem key={nanoid()} {...comment} />
                  ))}
              </ul>
              {commentsData.length > itemsPerPage && (
                <Styled.PaginationWrapper>
                  <Pagination
                    totalItemCount={commentsData.length}
                    itemsPerPage={itemsPerPage}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                  />
                </Styled.PaginationWrapper>
              )}
            </>
          )}
          <Styled.CommentInputForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.Author>
              <ImageWrapper
                width="4rem"
                height="4rem"
                imgStyle="border-radius: 50%;"
              >
                <Image src="/images/seller-profileIMG.png" layout="fill" />
              </ImageWrapper>
              <span className="ellipsis-single">{nickname}</span>
            </Styled.Author>
            <Styled.CommentInput htmlFor="comment">
              <span className="sr-only">댓글 입력창</span>
              <input
                type="text"
                id="comment"
                maxLength={100}
                placeholder="댓글을 입력하세요(10자 이상, 공백 불가)"
                {...register('comment', {
                  required: true,
                  minLength: 10,
                  pattern: /[^\s]/
                })}
              />
            </Styled.CommentInput>
            <Buttons.Custom
              width={7}
              height={3}
              fontSize={1.4}
              color="green"
              disabled={!isValid}
            >
              작성
            </Buttons.Custom>
          </Styled.CommentInputForm>
        </>
      )}
    </Styled.CommentSection>
  );
}
