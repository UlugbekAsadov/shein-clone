"use server";

import { updateTag } from "next/cache";
import { ApiError } from "@/core/api/api-error";
import { ME_CACHE_TAG } from "@/features/auth/api/auth.api";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";
import { accountApi } from "@/features/profile/pages/account/api/account.api";
import type {
  IProfileUpdateRequest,
  IUploadResult,
} from "@/features/profile/pages/account/utils/account.interface";
import type { IActionResult } from "@/types/action-result.interface";

export interface IProfileActionPayload {
  name: string;
  surname: string;
  birth_date: string;
  gender: "male" | "female";
  image?: string;
}

function toUpdateRequest(payload: IProfileActionPayload): IProfileUpdateRequest {
  const request: IProfileUpdateRequest = {
    name: payload.name.trim(),
    surname: payload.surname.trim(),
    birth_date: payload.birth_date,
    gender: payload.gender,
  };
  if (payload.image !== undefined) request.image = payload.image;
  return request;
}

function resolveUploadUrl(data: IUploadResult | string | undefined): string {
  if (!data) return "";
  if (typeof data === "string") return data;
  return data.url ?? data.path ?? "";
}

function toActionError<T>(error: unknown): IActionResult<T> {
  if (error instanceof ApiError) {
    return {
      ok: false,
      message: error.userMessage,
      errorCode: error.errorCode,
    };
  }
  throw error;
}

export async function updateProfileAction(
  payload: IProfileActionPayload,
): Promise<IActionResult<IAuthUser>> {
  try {
    const result = await accountApi.update(toUpdateRequest(payload));
    updateTag(ME_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<IAuthUser>(error);
  }
}

export async function uploadProfileImageAction(
  formData: FormData,
): Promise<IActionResult<string>> {
  try {
    const result = await accountApi.upload(formData);
    return {
      ok: true,
      message: result.message,
      data: resolveUploadUrl(result.data),
    };
  } catch (error) {
    return toActionError<string>(error);
  }
}
