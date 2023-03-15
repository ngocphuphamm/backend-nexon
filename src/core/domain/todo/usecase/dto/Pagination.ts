import { Expose } from 'class-transformer';

export class Pagination {
  @Expose()
  public sumPage: number;

  @Expose()
  public page: number;

  @Expose()
  public limit: number;
}
