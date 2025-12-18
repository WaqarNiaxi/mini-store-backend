export type HttpErrorType = Error & { statusCode: number };

export const httpError = (
  statusCode: number,
  message: string
): HttpErrorType => {
  const error = new Error(message) as HttpErrorType;
  error.statusCode = statusCode;
  return error;
};
