export type ISearchParamValue = string | number | boolean | undefined | null;
export type ISearchParamEntry = ISearchParamValue | ISearchParamValue[];

export interface IHttpOptions extends Omit<RequestInit, "body" | "method"> {
  searchParams?: Record<string, ISearchParamEntry>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}
