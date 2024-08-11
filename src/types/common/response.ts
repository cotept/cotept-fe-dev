export interface ResponseData<T> {
  data: T;
}

export interface ICommonResponse<T> extends ResponseData<T> {
  code: 'SUCCESS' | 'ERROR' | 'FAIL';
  message: string;
  statusCode: number;
}

export type ResponseCode = 200 | 404 | 403 | 401 | 402;
