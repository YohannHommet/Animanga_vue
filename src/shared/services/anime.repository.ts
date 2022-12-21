import HttpClient from "@/shared/services/http-client";
import { AnimeListTransformer } from "@/core/transformers/anime-list.transformer";
import { AnimeTransformer } from "@/core/transformers/anime.transformer";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IDataList } from "@/core/interfaces/anime-list.interface";
import type { IAnime } from "@/core/interfaces/anime.interface";

export class AnimeRepository extends HttpClient {
  public static repositoryInstance?: AnimeRepository;
  private static readonly baseUrl: string = "https://api.jikan.moe/v4/";
  private readonly baseEndpoint: string = "anime";

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

  public async getTopList(searchParams?: URLSearchParams): Promise<IDataList<IAnime>> {
    const url = searchParams
      ? `top/${this.baseEndpoint}?${searchParams}`
      : `top/${this.baseEndpoint}`;

    const response: AxiosResponse = await this.instance.get(url);

    return AnimeListTransformer.transform(response.data);
  }

  public async getBySearch(searchParams: URLSearchParams): Promise<IDataList<IAnime>> {
    const response: AxiosResponse = await this.instance.get(`${this.baseEndpoint}?${searchParams}`);

    return AnimeListTransformer.transform(response.data);
  }

  public async getById(id: number): Promise<IAnime> {
    const response: AxiosResponse = await this.instance.get(`${this.baseEndpoint}/${id}`);

    return AnimeTransformer.transform(response.data.data);
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
    config.headers = {
      "Content-Type": "application/json"
    };

    return config;
  }
}
