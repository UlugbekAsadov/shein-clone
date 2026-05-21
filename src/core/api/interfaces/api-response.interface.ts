export interface IApiResponse<TData = unknown> {
  success: boolean;
  message: string;
  data?: TData;
  error_code?: string;
  errors?: Record<string, string[]>;
}

export interface IApiErrorBody {
  success: false;
  message: string;
  error_code?: string;
  errors?: Record<string, string[]>;
}
