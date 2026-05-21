import type { IApiErrorBody } from "./interfaces/api-response.interface";

export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly endpoint: string;
  readonly body: IApiErrorBody | string | null;

  constructor(
    status: number,
    statusText: string,
    endpoint: string,
    body: IApiErrorBody | string | null,
  ) {
    super(`API ${status} ${statusText} at ${endpoint}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.endpoint = endpoint;
    this.body = body;
  }

  private get bodyObject(): IApiErrorBody | null {
    return typeof this.body === "object" && this.body !== null ? this.body : null;
  }

  get errorCode(): string | undefined {
    return this.bodyObject?.error_code;
  }

  get validationErrors(): Record<string, string[]> | undefined {
    return this.bodyObject?.errors;
  }

  get firstValidationMessage(): string | undefined {
    const errors = this.validationErrors;
    if (!errors) return undefined;
    for (const messages of Object.values(errors)) {
      if (messages?.[0]) return messages[0];
    }
    return undefined;
  }

  get userMessage(): string {
    return (
      this.firstValidationMessage ??
      this.bodyObject?.message ??
      this.statusText ??
      "Something went wrong"
    );
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isValidation(): boolean {
    return this.status === 422 || this.errorCode === "VALIDATION_ERROR";
  }

  get isInvalidCode(): boolean {
    return this.errorCode === "INVALID_VERIFICATION_CODE";
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}
