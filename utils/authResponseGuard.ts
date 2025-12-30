import type { ApiResponseBase } from "@/types/api-response-base";

export function isApiSuccess<T extends ApiResponseBase>(
  response: T
): response is T & { success: true } {
  return response.success === true;
}

export function isApiError<T extends ApiResponseBase>(
  response: T
): response is T & { success: false } {
  return response.success === false;
}
