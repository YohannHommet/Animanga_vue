import type { IPagination } from "./pagination.interface";
import type { IAnime } from "./anime.interface";

export interface IAnimeList {
  readonly data: Array<IAnime>;
  readonly pagination: IPagination;
}
