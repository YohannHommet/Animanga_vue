import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IHttpClient {
  readonly instance: AxiosInstance;

  _initializeRequestInterceptor(): void;

  _initializeResponseInterceptor(): void;

  _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig;

  _handleResponse(response: AxiosResponse): AxiosResponse;

  _handleError(error: any): Promise<any>;
}
