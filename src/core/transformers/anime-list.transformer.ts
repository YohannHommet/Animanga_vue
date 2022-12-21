import { AnimeTransformer } from "@/core/transformers/anime.transformer";
import { PaginationTransformer } from "@/core/transformers/pagination.transformer";

import type { IAnime } from "@/core/interfaces/anime.interface";
import type { IDataList } from "@/core/interfaces/anime-list.interface";

export class AnimeListTransformer {
  public static transform(data: any): IDataList<IAnime> {
    return {
      data: data.data.map((anime: Array<any>): IAnime => AnimeTransformer.transform(anime)),
      pagination: PaginationTransformer.transform(data.pagination)
    };
  }
}
