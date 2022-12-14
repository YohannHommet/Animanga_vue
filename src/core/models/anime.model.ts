import type { IAnime } from "@/shared/interfaces/anime.interface";

export class AnimeModel implements IAnime {

  public readonly id: number;
  public readonly title: string;
  public readonly image: string;
  public readonly synopsis: string;

  private constructor(id: number, title: string, image: string, synopsis: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.synopsis = synopsis;
  }

  public static create(id: number, title: string, image: string, synopsis: string): AnimeModel {
    return new AnimeModel(id, title, image, synopsis);
  }
}
