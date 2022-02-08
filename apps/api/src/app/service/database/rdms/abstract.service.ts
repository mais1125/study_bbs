import { Injectable } from '@nestjs/common';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  ObjectID,
} from 'typeorm';

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
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  ): Promise<Entity> {
    return getRepository<Entity>(this.entityName).findOne(id, options);
  }

  /**
   * データを全て取得(read)
   */
  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await getRepository<Entity>(this.entityName).find(options);
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
   * データ件数取得(Count)
   */
  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]> {
    return getRepository<Entity>(this.entityName).findAndCount(options);
  }
}
