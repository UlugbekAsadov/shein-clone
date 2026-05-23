"use server";

import { updateTag } from "next/cache";
import { ApiError } from "@/core/api/api-error";
import { ADDRESS_CACHE_TAG, addressApi } from "@/features/profile/api/address.api";
import type {
  IAddress,
  IAddressCreateRequest,
  IAddressUpdateRequest,
} from "@/features/profile/interfaces/address.interface";
import type { IActionResult } from "@/types/action-result.interface";

const DEFAULT_COUNTRY = "Uzbekistan";
const DEFAULT_REGION_ID = 1;
const DEFAULT_DISTRICT_ID = 1;

export interface IAddressActionPayload {
  type: "home" | "work" | "other";
  name: string;
  address: string;
  lat: number;
  long: number;
  country?: string;
  region_id?: number;
  district_id?: number;
  is_default?: boolean;
}

function toCreateRequest(payload: IAddressActionPayload): IAddressCreateRequest {
  return {
    name: payload.name.trim(),
    type: payload.type,
    address: payload.address.trim(),
    country: payload.country ?? DEFAULT_COUNTRY,
    region_id: payload.region_id ?? DEFAULT_REGION_ID,
    district_id: payload.district_id ?? DEFAULT_DISTRICT_ID,
    lat: payload.lat,
    long: payload.long,
    is_default: payload.is_default ?? false,
  };
}

function toUpdateRequest(
  payload: Partial<IAddressActionPayload>,
): IAddressUpdateRequest {
  const request: IAddressUpdateRequest = {};
  if (payload.name !== undefined) request.name = payload.name.trim();
  if (payload.type !== undefined) request.type = payload.type;
  if (payload.address !== undefined) request.address = payload.address.trim();
  if (payload.country !== undefined) request.country = payload.country;
  if (payload.region_id !== undefined) request.region_id = payload.region_id;
  if (payload.district_id !== undefined)
    request.district_id = payload.district_id;
  if (payload.lat !== undefined) request.lat = payload.lat;
  if (payload.long !== undefined) request.long = payload.long;
  if (payload.is_default !== undefined) request.is_default = payload.is_default;
  return request;
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

export async function createAddressAction(
  payload: IAddressActionPayload,
): Promise<IActionResult<IAddress>> {
  try {
    const result = await addressApi.create(toCreateRequest(payload));
    updateTag(ADDRESS_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<IAddress>(error);
  }
}

export async function updateAddressAction(
  id: number | string,
  payload: Partial<IAddressActionPayload>,
): Promise<IActionResult<IAddress>> {
  try {
    const result = await addressApi.update(id, toUpdateRequest(payload));
    updateTag(ADDRESS_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<IAddress>(error);
  }
}

export async function deleteAddressAction(
  id: number | string,
): Promise<IActionResult> {
  try {
    const result = await addressApi.delete(id);
    updateTag(ADDRESS_CACHE_TAG);
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function setDefaultAddressAction(
  id: number | string,
): Promise<IActionResult<IAddress>> {
  try {
    const result = await addressApi.setDefault(id);
    updateTag(ADDRESS_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<IAddress>(error);
  }
}
