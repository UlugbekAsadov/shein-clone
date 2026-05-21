export interface IActionResult<TData = null> {
  ok: boolean;
  message?: string;
  data?: TData;
  errorCode?: string;
}
