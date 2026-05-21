export type ISearchParamValue = string | number | boolean | undefined | null;

export interface IHttpOptions extends Omit<RequestInit, "body" | "method"> {
  searchParams?: Record<string, ISearchParamValue>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  skipAuth?: boolean;
}
