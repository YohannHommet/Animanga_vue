import HttpClient from "@/core/http-client/http-client";
import { AnimeListTransformer } from "@/core/transformers/anime-list.transformer";
import { AnimeTransformer } from "@/core/transformers/anime.transformer";

import type { AxiosResponse } from "axios";
import type { IDataList } from "@/shared/interfaces/anime-list.interface";
import type { IAnime } from "@/shared/interfaces/anime.interface";
import type { IAnimeRepository } from "@/shared/interfaces/anime-repository.interface";

export class AnimeRepository extends HttpClient implements IAnimeRepository {
  public static repositoryInstance?: AnimeRepository;
  private static readonly baseUrl: string = "https://api.jikan.moe/v4/";
  private static readonly baseEndpoint: string = "anime";

  private constructor() {
    super(AnimeRepository.baseUrl);

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  /**
   * Get an instance of the repository or create one
   * @return AnimeRepository
   */
  public static getInstance(): AnimeRepository {
    if (!this.repositoryInstance) {
      this.repositoryInstance = new AnimeRepository();
    }
    return this.repositoryInstance;
  }

  public async getTopList(searchParams: URLSearchParams): Promise<IDataList<IAnime>> {
    try {
      const response: AxiosResponse = await this.instance.get(`top/${AnimeRepository.baseEndpoint}?${searchParams}`);
      return AnimeListTransformer.transform(response.data);
    } catch (error: any) {
      return this._handleError(error);
    }

  }

  public async getBySearch(searchParams: URLSearchParams): Promise<IDataList<IAnime>> {
    try {
      const response: AxiosResponse = await this.instance.get(`${AnimeRepository.baseEndpoint}?${searchParams}`);
      return AnimeListTransformer.transform(response.data);
    } catch (error: any) {
      return this._handleError(error);
    }

  }

  public async getById(id: number): Promise<IAnime> {
    try {
      const response: AxiosResponse = await this.instance.get(`${AnimeRepository.baseEndpoint}/${id}`);
      return AnimeTransformer.transform(response.data.data);
    } catch (error: any) {
      return this._handleError(error);
    }
  }

  protected _initializeRequestInterceptor() {
    super._initializeRequestInterceptor();
  }

  /**
   * @description Implementation of the abstract method
   * @protected
   */
  protected _initializeResponseInterceptor() {
    super._initializeResponseInterceptor();
  }
}
