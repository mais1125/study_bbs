import {
  Category,
  CategoryRead,
  DATE_FORMAT,
  ThreadRead,
} from '@common/models';
import { Injectable } from '@nestjs/common';
import {
  CategoryEntityService,
  MessageEntityService,
  ThreadEntityService,
} from '@services/entities';
import moment = require('moment');

import { CategoryEntity } from '../../typeorm/entities/category.entity';

@Injectable()
export class RxJSService {
  constructor(
    private categoryEntityService: CategoryEntityService,
    private threadEntityService: ThreadEntityService,
    private messageEntityService: MessageEntityService
  ) {}

  /**
   * カテゴリーを取得
   */
  async categoriesRead(): Promise<Category[]> {
    return await this.categoryEntityService.find();
  }

  /**
   * スレッドを各カテゴリー最新から５件ずつ取得
   */
  async allRead(): Promise<CategoryRead[]> {
    // category を取得する
    const categories =
      (await this.categoryEntityService.find()) as CategoryRead[];
    // 各カテゴリに属するスレッド最新5件取得
    for (let i = 0; i < categories.length; i++) {
      const res = (await this.threadEntityService.find({
        where: [{ cid: categories[i].id }],
        order: { createAt: 'DESC' },
        take: 2,
      })) as ThreadRead[];
      for (let i = 0; i < res.length; i++) {
        const [messages, total] = await this.messageEntityService.findAndCount({
          where: { tid: res[i].id },
          take: 1,
          order: { createAt: 'ASC' },
        });
        res[i].message = [...messages];
        res[i].total = total;
      }
      categories[i].thread = [...res];
    }
    return categories;
  }

  /**
   * カテゴリーごとにスレッドを取得
   */
  async categoryRead(id: number): Promise<Category> {
    const res = await this.categoryEntityService.findOne(id, {
      relations: ['thread', 'thread.message'],
    });
    res.thread.filter((item) => {
      item.createAt = moment(item.createAt).format(DATE_FORMAT.FOMAT);
      item.updateAt = moment(item.updateAt).format(DATE_FORMAT.FOMAT);
    });
    return res;
  }

  // /**
  //  * スレッドを全件取得
  //  */
  // async thradsRead(): Promise<Category[]> {
  //   const res = await this.categoryEntityService.find({
  //     relations: ['thread', 'thread.message'],
  //   });
  //   res.filter((item) =>
  //     item.thread.filter((item) => {
  //       item.createAt = moment(item.createAt).format(DATE_FORMAT.FOMAT);
  //       item.updateAt = moment(item.updateAt).format(DATE_FORMAT.FOMAT);
  //     })
  //   );

  //   return res;
  // }
}
