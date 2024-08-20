import { Response } from "express";

type SuccessData = Record<string, any>;

interface ErrorResponse {
  message: string | string[];
  code?: string;
  details?: Record<string, any>;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export function sendSuccess(
  res: Response,
  data: SuccessData,
  status: HttpStatus = HttpStatus.OK
): void {
  res.status(status).json({
    success: true,
    data,
    error: null,
  });
}

export function sendError(
  res: Response,
  error: ErrorResponse | string | string[],
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
): void {
  res.status(status).json({
    success: false,
    data: null,
    error,
  });
}
