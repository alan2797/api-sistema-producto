// pagination-response.dto.ts
export class PaginationResponseDto<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[] | T;
}
