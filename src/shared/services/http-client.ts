import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosResponse } from "axios";

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  protected _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
      );
  }

  protected _handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  protected _handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpClient;
