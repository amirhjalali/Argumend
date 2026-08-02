export type SearchParamValue = string | string[] | undefined;

export const TOPICS_PAGE_SIZE = 24;

export interface PaginationResult<T> {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  startIndex: number;
  endIndex: number;
  isOutOfRange: boolean;
}

/** Parse a query-string page number without ever returning zero or NaN. */
export function parsePageParam(value: SearchParamValue): number {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate || !/^\d+$/.test(candidate)) return 1;

  const page = Number(candidate);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function paginate<T>(
  values: readonly T[],
  requestedPage: number,
  pageSize: number,
): PaginationResult<T> {
  if (!Number.isSafeInteger(pageSize) || pageSize < 1) {
    throw new RangeError("pageSize must be a positive integer");
  }

  const total = values.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const isOutOfRange = page > pageCount;
  const startIndex = (page - 1) * pageSize;
  const items = isOutOfRange
    ? []
    : values.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page,
    pageCount,
    total,
    startIndex,
    endIndex: startIndex + items.length,
    isOutOfRange,
  };
}

/** Build a stable pagination URL while preserving discovery filters. */
export function buildPageHref(
  pathname: string,
  page: number,
  params?: URLSearchParams,
): string {
  const next = new URLSearchParams(params);
  if (page <= 1) next.delete("page");
  else next.set("page", String(page));

  const query = next.toString();
  return query ? `${pathname}?${query}` : pathname;
}
