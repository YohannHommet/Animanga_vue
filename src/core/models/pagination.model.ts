import type { IPagination, IPaginationItems } from "@/shared/interfaces/pagination.interface";

export class PaginationModel implements IPagination {
  public readonly current_page: number;
  public readonly has_next_page: boolean;
  public readonly last_visible_page: number;
  public readonly items: IPaginationItems;

  private constructor(
    current_page: number,
    has_next_page: boolean,
    last_visible_page: number,
    items: IPaginationItems
  ) {
    this.current_page = current_page;
    this.has_next_page = has_next_page;
    this.last_visible_page = last_visible_page;
    this.items = items;
  }

  public static create(
    current_page: number,
    has_next_page: boolean,
    last_visible_page: number,
    items: IPaginationItems
  ): PaginationModel {
    return new PaginationModel(
      current_page,
      has_next_page,
      last_visible_page,
      items
    );
  }
}
