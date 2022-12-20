import { AnimeModel } from "@/core/models/anime.model";

export class AnimeTransformer {
  public static transform(data: any): AnimeModel {
    return AnimeModel.create(
      data.mal_id,
      data.title,
      data.images.webp.image_url,
      data.synopsis
    );
  }
}
