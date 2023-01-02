import type { IDataList } from "@/shared/interfaces/anime-list.interface";
import type { IAnime } from "@/shared/interfaces/anime.interface";

export interface IAnimeRepository {
  /**
   * @description Get the top anime list.
   * @param searchParams
   */
  getTopList(searchParams: URLSearchParams): Promise<IDataList<IAnime>>;

  /**
   * @description Get the anime list by search.
   * @param searchParams
   */
  getBySearch(searchParams: URLSearchParams): Promise<IDataList<IAnime>>;

  /**
   * @description Get the anime by id.
   * @param id
   */
  getById(id: number): Promise<IAnime>;
}
