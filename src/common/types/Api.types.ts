import { User } from './User.types';

export type UserApiResponse = {
  status: string;
  results: number;
  data: { users: User[] };
  pagination: PaginationApi;
};

export type PaginationApi = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
