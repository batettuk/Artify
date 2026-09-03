import "server-only";

export class CmsConfigurationError extends Error {
  constructor(
    readonly code:
      | "CUSTOM_POST_TYPE_NOT_FOUND"
      | "CUSTOM_POST_TYPE_AMBIGUOUS",
    message: string,
  ) {
    super(message);
    this.name = "CmsConfigurationError";
  }
}

export function isCmsConfigurationError(
  error: unknown,
): error is CmsConfigurationError {
  return error instanceof CmsConfigurationError;
}
