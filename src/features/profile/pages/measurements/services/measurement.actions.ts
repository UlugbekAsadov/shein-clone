"use server";

import { updateTag } from "next/cache";
import { ApiError } from "@/core/api/api-error";
import { MEASUREMENT_CACHE_TAG, measurementApi } from "@/features/profile/pages/measurements/api/measurement.api";
import type { IMeasurements } from "@/features/profile/pages/measurements/utils/measurement.interface";
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

export async function saveMeasurementsAction(
  payload: IMeasurements,
): Promise<IActionResult<IMeasurements>> {
  try {
    const result = await measurementApi.save(payload);
    updateTag(MEASUREMENT_CACHE_TAG);
    return { ok: true, message: result.message, data: result.data };
  } catch (error) {
    return toActionError<IMeasurements>(error);
  }
}
