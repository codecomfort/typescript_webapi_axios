import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {Dao, DaoParams} from "./interfaces";
import {IEntityFactory} from "./entities/entityFactory";

export class HttpDao<TEntity> implements Dao {
  constructor(
    private axiosInstance: AxiosInstance,
    private entityFactory: IEntityFactory<TEntity>
) {}

  read = async (params: DaoParams): Promise<TEntity> => {
    // console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const {url, ...rest} = params;
    const config: AxiosRequestConfig = {
      params: rest
    };

    let response: AxiosResponse;
    try {
      response = await this.axiosInstance.get(url, config);
      // console.log(`response: ${JSON.stringify(response.data, null, 2)}`);
    }
    catch (ex) {
      console.log(`get 時にエラーが発生しました: ${ex.message}`);
      console.log(`url: ${url}`);
      console.log(`config: ${JSON.stringify(config, null, 2)}`);
      throw ex;
    }

    return this.entityFactory.create(response.data);
  }

  create: (params: DaoParams) => Promise<TEntity>;
  update: (params: DaoParams) => Promise<TEntity>;
  del: (params: DaoParams) => Promise<TEntity>;
}
