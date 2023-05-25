// ========== Response Types
// import all modules
import { HttpStatus } from '@nestjs/common';

export interface ISuccessResponse<T> {
  statusCode: HttpStatus;
  data: T | T[];
}

export interface IFailedResponse<T> {
  statusCode: HttpStatus;
  data: T | T[];
  errors: Record<string, string[]>;
}

export type IResponse<T> = ISuccessResponse<T> | IFailedResponse<T>;
