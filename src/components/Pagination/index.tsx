import { Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";
import PrevIcon from "public/images/icon-caret-prev.svg";
import NextIcon from "public/images/icon-caret-next.svg";
import * as Styled from "./styled";

interface IPaginationProps {
  totalItemCount: number;
  itemsPerPage: number;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

export function Pagination({
  totalItemCount,
  itemsPerPage,
  pageNum,
  setPageNum,
}: IPaginationProps) {
  const totalPageCount = Math.ceil(totalItemCount / itemsPerPage);

  return (
    <Styled.Nav>
      <Styled.Button
        onClick={() => {
          setPageNum(1);
        }}
        disabled={pageNum === 1}
      >
        <PrevIcon viewBox="0 0 10 18" />
        <PrevIcon viewBox="0 0 10 18" />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPageNum(pageNum - 1);
        }}
        disabled={pageNum === 1}
      >
        <PrevIcon viewBox="0 0 10 18" />
      </Styled.Button>
      {[...Array(totalPageCount)].map((_, index) => (
        <Styled.PageButton
          key={nanoid()}
          onClick={() => setPageNum(index + 1)}
          isCurrentPage={pageNum === index + 1}
        >
          {index + 1}
        </Styled.PageButton>
      ))}
      <Styled.Button
        onClick={() => {
          setPageNum(pageNum + 1);
        }}
        disabled={pageNum === totalPageCount}
      >
        <NextIcon viewBox="0 0 10 18" />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPageNum(totalPageCount);
        }}
        disabled={pageNum === totalPageCount}
      >
        <NextIcon viewBox="0 0 10 18" />
        <NextIcon viewBox="0 0 10 18" />
      </Styled.Button>
    </Styled.Nav>
  );
}
