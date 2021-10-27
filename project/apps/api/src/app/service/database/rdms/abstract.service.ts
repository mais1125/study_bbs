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
   * データ取得(Read)
   */
  find(params?: Partial<Entity>): Promise<Entity[]> {
    return getRepository<Entity>(this.entityName).find(params);
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

  /**
   * データを1件だけ取得
   */
  findOne(
    params?: Partial<Entity | string>,
    options?: FindOneOptions<Entity>
  ): Promise<Entity> {
    return getRepository<Entity>(this.entityName).findOne(params, options);
  }
}
