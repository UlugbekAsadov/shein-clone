"use server";

import { ApiError } from "@/core/api/api-error";
import type { IActionResult } from "@/types/action-result.interface";
import { cartApi } from "@/features/cart/api/cart.api";
import type {
  ICartData,
  IMinOrderAmount,
} from "@/features/cart/utils/cart.interface";
import { getCartSessionId } from "./cart-session";

interface IAddToCartInput {
  productId: number;
  skuId: number;
  count: number;
}

function toActionError(error: unknown): IActionResult<ICartData> {
  if (error instanceof ApiError) {
    return { ok: false, message: error.userMessage, errorCode: error.errorCode };
  }
  throw error;
}

export async function getCartAction(): Promise<IActionResult<ICartData>> {
  try {
    const sessionId = await getCartSessionId();
    const result = await cartApi.get(sessionId);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError(error);
  }
}

export async function addToCartAction({
  productId,
  skuId,
  count,
}: IAddToCartInput): Promise<IActionResult<ICartData>> {
  try {
    const sessionId = await getCartSessionId();
    const result = await cartApi.addOrUpdate(productId, skuId, count, sessionId);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateCartItemAction(
  input: IAddToCartInput,
): Promise<IActionResult<ICartData>> {
  return addToCartAction(input);
}

export async function removeCartItemAction(
  productId: number,
): Promise<IActionResult<ICartData>> {
  try {
    const sessionId = await getCartSessionId();
    const result = await cartApi.remove(productId, sessionId);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError(error);
  }
}

export async function clearCartAction(): Promise<IActionResult<ICartData>> {
  try {
    const sessionId = await getCartSessionId();
    const result = await cartApi.clear(sessionId);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError(error);
  }
}

export async function getMinOrderAmountAction(): Promise<
  IActionResult<IMinOrderAmount>
> {
  try {
    const result = await cartApi.getMinOrderAmount();
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.userMessage,
        errorCode: error.errorCode,
      };
    }
    throw error;
  }
}
