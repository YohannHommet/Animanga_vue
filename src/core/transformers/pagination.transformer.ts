import type { IPagination } from "@/shared/interfaces/pagination.interface";

export class PaginationTransformer {
  public static transform(data: any): IPagination {
    return {
      current_page: data.current_page,
      has_next_page: data.has_next_page,
      last_visible_page: data.last_visible_page,
      items: {
        count: data.items.count,
        per_page: data.items.per_page,
        total: data.items.total
      },
    };
  }
}
