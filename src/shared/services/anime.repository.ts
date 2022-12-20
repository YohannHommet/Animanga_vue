import HttpClient from "@/shared/services/http-client";
import { AnimeListTransformer } from "@/core/transformers/anime-list.transformer";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IAnimeList } from "@/core/interfaces/anime-list.interface";

export class AnimeRepository extends HttpClient {
  private static readonly baseUrl: string = "https://api.jikan.moe/v4/";
  public static repositoryInstance?: AnimeRepository;

  private constructor() {
    super(AnimeRepository.baseUrl);

    this._initializeResponseInterceptor();
  }

  public static getInstance(): AnimeRepository {
    if (!this.repositoryInstance) {
      this.repositoryInstance = new AnimeRepository();
    }
    return this.repositoryInstance;
  }

  public async getAnimeList(endpoint: string): Promise<IAnimeList> {
    const response: AxiosResponse = await this.instance.get(endpoint);

    return AnimeListTransformer.transform(response.data);
  }

  public async getAnimeSearch(endpoint: string, searchQuery?: string, searchParams?: any): Promise<any> {
    if (searchQuery) {
      endpoint += `?q=${searchQuery}`;
    }

    if (searchParams) {
      endpoint += `&${searchParams}`;
    }

    const response: AxiosResponse = await this.instance.get(endpoint);

    return AnimeListTransformer.transform(response.data);
  }

  protected _initializeResponseInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );

    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  private _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    console.log("Request Interceptor", config);
    // @ts-ignore
    config.headers["Content-Type"] = "application/json";

    return config;
  }
}
