import { Dispatch, SetStateAction } from "react";
import PrevIcon from "public/images/icon-caret-prev.svg";
import NextIcon from "public/images/icon-caret-next.svg";
import * as Styled from "./styled";

interface IPaginationProps {
  totalItemCount: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function Pagination({
  totalItemCount,
  limit,
  page,
  setPage,
}: IPaginationProps) {
  const totalPageCount = Math.ceil(totalItemCount / limit);

  return (
    <Styled.Nav>
      <Styled.Button
        onClick={() => {
          setPage(1);
        }}
        disabled={page === 1}
      >
        <PrevIcon viewBox="0 0 10 18" />
        <PrevIcon viewBox="0 0 10 18" />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        <PrevIcon viewBox="0 0 10 18" />
      </Styled.Button>
      {[...Array(totalPageCount)].map((_, index) => (
        <Styled.PageButton
          key={`page-${index}`}
          onClick={() => setPage(index + 1)}
          isCurrentPage={page === index + 1}
        >
          {index + 1}
        </Styled.PageButton>
      ))}
      <Styled.Button
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === totalPageCount}
      >
        <NextIcon viewBox="0 0 10 18" />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPage(totalPageCount);
        }}
        disabled={page === totalPageCount}
      >
        <NextIcon viewBox="0 0 10 18" />
        <NextIcon viewBox="0 0 10 18" />
      </Styled.Button>
    </Styled.Nav>
  );
}
