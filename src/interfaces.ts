export interface DaoParams {
  [name: string]: any;
}
export interface Dao {
  read: (params: DaoParams) => Promise<any>;
  create: (params: DaoParams) => Promise<any>;
  update: (params: DaoParams) => Promise<any>;
  del: (params: DaoParams) => Promise<any>;
}