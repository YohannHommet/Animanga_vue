import type { IPagination } from "./pagination.interface";

export interface IDataList<T> {
  readonly data: Array<T>;
  readonly pagination: IPagination;
}
