import axios from 'axios';
import type { AxiosInstance } from "axios";
import type { AxiosResponse } from "axios";

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess({ data }: AxiosResponse): AxiosResponse {
    return data;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpClient;
