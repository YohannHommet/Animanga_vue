import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  protected _initializeResponseInterceptor() {
    this.instance.interceptors.request.use(
      this._handleResponse,
      this._handleError
      );
  }

  private _handleResponse(response: AxiosRequestConfig): AxiosRequestConfig {
    return response.data;
  }

  private _handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpClient;
