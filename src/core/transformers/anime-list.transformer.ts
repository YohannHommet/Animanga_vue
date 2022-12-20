import type { IAnimeList } from "@/core/interfaces/anime-list.interface";
import { AnimeTransformer } from "@/core/transformers/anime.transformer";
import type { IAnime } from "@/core/interfaces/anime.interface";
import { PaginationTransformer } from "@/core/transformers/pagination.transformer";

export class AnimeListTransformer {
  public static transform(data: any): IAnimeList {
    return {
      data: data.data.map((anime: Array<any>): IAnime => AnimeTransformer.transform(anime)),
      pagination: PaginationTransformer.transform(data.pagination)
    };
  }
}
