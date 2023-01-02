import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import type { IHttpClient } from "@/shared/interfaces/http-client.interface";

// @ts-ignore
abstract class HttpClient implements IHttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  /**
   * @description Initialize the request interceptor.
   * @protected
   * @return {void}
   */
  protected _initializeRequestInterceptor(): void {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  }

  /**
   * @description Initialize the response interceptor.
   * @protected
   * @return {void}
   */
  protected _initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  /**
   * @description Implementation of the request interceptor. Can be overridden.
   * @param {AxiosRequestConfig} config
   * @protected
   * @return {AxiosRequestConfig} config
   */
  protected _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    config.headers = {
      "Content-Type": "application/json"
    };

    return config;
  }

  /**
   * @description Implementation of the response interceptor. Can be overridden.
   * @param {AxiosResponse} response
   * @protected
   * @return {AxiosResponse} response
   */
  protected _handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  /**
   * @description Implementation of the error interceptor. Can be overridden.
   * @param {AxiosError} error
   * @protected
   * @return {Promise<any>} error
   */
  protected _handleError(error: AxiosError): Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpClient;
