export interface IPaginationItems {
  readonly count: number;
  readonly per_page: number;
  readonly total: number;
}

export interface IPagination {
  readonly current_page: number,
  readonly has_next_page: boolean,
  readonly items: IPaginationItems,
  readonly last_visible_page: number
}
