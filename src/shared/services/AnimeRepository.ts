import HttpClient from "@/shared/services/HttpClient";
import { AnimeTransformer } from "@/core/transformers/Anime.transformer";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { AnimeModel } from "@/core/models/Anime.model";

export class AnimeRepository extends HttpClient {
  public static repositoryInstance?: AnimeRepository;

  private constructor() {
    super("https://api.jikan.moe/v4/");

    this._initializeResponseInterceptor();
  }

  public static getInstance(): AnimeRepository {
    if (!this.repositoryInstance) {
      this.repositoryInstance = new AnimeRepository();
    }
    return this.repositoryInstance;
  }

  public async getAnimeList(endpoint: string): Promise<Array<AnimeModel>> {
    const response: AxiosResponse = await this.instance.get(`https://api.jikan.moe/v4/${endpoint}`);

    return response.data.data.map((anime: any) => {
      return AnimeTransformer.transform(anime);
    });
  }

  public async getAnimeSearch(endpoint: string, searchQuery: string, searchParams: Array<string>): Promise<any> {
    endpoint = `${endpoint}?q=${searchQuery}`;

    searchParams.forEach((param, value) => {
      endpoint += `&${param}=${value}`;
    });

    return await this.instance.get(endpoint);
  }

  protected _initializeResponseInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest.bind(this)
    );
  }

  private _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    config.headers["Content-Type"] = "application/json";

    return config;
  }
}
