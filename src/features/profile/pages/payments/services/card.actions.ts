"use server";

import { updateTag } from "next/cache";
import { ApiError } from "@/core/api/api-error";
import { CARD_CACHE_TAG, cardApi } from "@/features/profile/pages/payments/api/card.api";
import type {
  ICard,
  ICardCreateRequest,
} from "@/features/profile/pages/payments/utils/card.interface";
import type { IActionResult } from "@/types/action-result.interface";

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

export async function createCardAction(
  payload: ICardCreateRequest,
): Promise<IActionResult<ICard>> {
  try {
    const result = await cardApi.create(payload);
    updateTag(CARD_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<ICard>(error);
  }
}

export async function deleteCardAction(
  id: number | string,
): Promise<IActionResult> {
  try {
    const result = await cardApi.delete(id);
    updateTag(CARD_CACHE_TAG);
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function setDefaultCardAction(
  id: number | string,
): Promise<IActionResult> {
  try {
    const result = await cardApi.setDefault(id);
    updateTag(CARD_CACHE_TAG);
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}
