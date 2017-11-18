// 通常版 → TS handbook - Generics - Using Class Types in Generics のサンプル通り
// const create = <TEntity>(entityConstructor: { new(): TEntity;}): TEntity => {
//   return new entityConstructor();
// };

export interface IEntityFactory<TEntity> {
  create: (data: any) => TEntity;
}

// TEntity のコンストラクタは引数なし(引数ありだとジェネリクス定義で破綻する)。
// ただし、必須項目が埋まってないインスタンスが瞬間的にせよ生成されてしまう気持ち悪さはある。
// また、TEntity はイミュータブルオブジェクトを想定。変更は with で行う。
// (typescript-immutable のリポジトリを参照)
// TEntityData は元となるデータの型。上述の通りコンストラクタは引数なしとしているため、
// こちらで定義する。
// mapper は webapi のレスポンスといった any 型のオブジェクトから TEntityData へデータを当てはめる関数。
export class EntityFactory<
  TEntity extends { with: (data: Partial<TEntityData>) => TEntity; },
  TEntityData> implements IEntityFactory<TEntity> {
    constructor(
      private entityConstructor: { new(): TEntity },
      private mapper: (data: any) => TEntityData) {};

    create = (data: any): TEntity => {
      return new this.entityConstructor().with(this.mapper(data));
    };
}

