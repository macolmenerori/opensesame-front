export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
};
