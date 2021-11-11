import { Injectable } from '@nestjs/common';
import { FindOneOptions, getRepository } from 'typeorm';

abstract class AbstractRDBMSInterface {
  constructor(entity: Partial<AbstractRDBMSInterface>) {
    Object.assign(this, entity);
  }
}

@Injectable()
export abstract class AbstractRDBMSService<
  Entity extends AbstractRDBMSInterface
> {
  constructor(private entityName: string) {}

  /**
   * データ作成(Save)
   */
  create(params: Entity): Promise<Entity> {
    return getRepository<Entity>(this.entityName).save(params);
  }

  /**
   * データを1件だけ個別取得(read)
   */
  findOne(params?: number, options?: FindOneOptions<Entity>): Promise<Entity> {
    return getRepository<Entity>(this.entityName).findOne(params, options);
  }

  /**
   * データを全て取得(read)
   */
  find(options?: FindOneOptions<Entity>): Promise<Entity[]> {
    return getRepository<Entity>(this.entityName).find(options);
  }

  /**
   * データ更新(Update)
   */
  update(params?: Entity): Promise<Entity> {
    return getRepository<Entity>(this.entityName).save(params);
  }

  /**
   * データ削除(Delete)
   */
  delete(params: Entity): Promise<Entity> {
    return getRepository<Entity>(this.entityName).remove(params);
  }
}
