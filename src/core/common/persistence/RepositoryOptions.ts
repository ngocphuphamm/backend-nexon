export type RepositoryFindOptions = {
  includeRemoved?: boolean;
  limit?: number;
  page?: number;
};

export type RepositoryUpdateManyOptions = {
  includeRemoved?: boolean;
};

export type RepositoryRemoveOptions = {
  disableSoftDeleting?: boolean;
};
