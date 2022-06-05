import { useState } from 'react';
import { nanoid } from 'nanoid';
import { IInquiry } from '@shared/types';
import { InquiryItem } from '../InquiryItem';
// import questionData from './dummyQuestionData.json';
import { Pagination } from '../Pagination';
import * as Styled from './styled';

interface IInquiryListProps {
  inquiries: IInquiry[];
}

export function InquiryList({ inquiries }: IInquiryListProps) {
  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      <Styled.List>
        <li>
          <span aria-hidden="true">답변상태</span>
          <span aria-hidden="true">질문</span>
          <span aria-hidden="true">작성자</span>
          <span aria-hidden="true">작성일</span>
        </li>
        {inquiries.slice(offset, offset + itemsPerPage).map((inquiry) => (
          <InquiryItem key={nanoid()} {...inquiry} />
        ))}
      </Styled.List>
      {inquiries.length > itemsPerPage && (
        <Pagination
          totalItemCount={inquiries.length}
          itemsPerPage={itemsPerPage}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      )}
    </>
  );
}
