import { Dispatch, SetStateAction } from "react";
import PrevIcon from "public/assets/icons/icon-caret-prev.svg";
import NextIcon from "public/assets/icons/icon-caret-next.svg";
import * as Styled from "./styled";

interface IPaginationProps {
  page: number;
  totalPageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPageCount, page, setPage }: IPaginationProps) => {
  const PAGE_RANGE = 10;
  const begin = Math.floor((page - 1) / PAGE_RANGE) * 10;
  const end = begin + 10;

  return (
    <Styled.Nav>
      <Styled.Button
        onClick={() => {
          setPage(1);
        }}
        disabled={page === 1}
      >
        <PrevIcon width={6} height={18} />
        <PrevIcon width={6} height={18} />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        <PrevIcon width={6} height={18} />
      </Styled.Button>
      {[...Array.from({ length: totalPageCount }, (_, i) => i + 1)]
        .slice(begin, end)
        .map((index) => (
          <Styled.PageButton
            key={`page-${index}`}
            onClick={() => setPage(index)}
            isCurrentPage={page === index}
          >
            {index}
          </Styled.PageButton>
        ))}
      <Styled.Button
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === totalPageCount}
      >
        <NextIcon width={6} height={18} />
      </Styled.Button>
      <Styled.Button
        onClick={() => {
          setPage(totalPageCount);
        }}
        disabled={page === totalPageCount}
      >
        <NextIcon width={6} height={18} />
        <NextIcon width={6} height={18} />
      </Styled.Button>
    </Styled.Nav>
  );
};

export default Pagination;
