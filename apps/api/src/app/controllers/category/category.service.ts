import { Category, DATE_FORMAT } from '@common/models';
import { Injectable } from '@nestjs/common';
import { CategoryEntityService, ThreadEntityService } from '@services/entities';
import moment = require('moment');

@Injectable()
export class CategoryService {
  constructor(
    private categoryEntityService: CategoryEntityService,
    private threadEntityService: ThreadEntityService
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
  async threadAllRead(): Promise<Category[]> {
    // category を取得する
    const categories = await this.categoryEntityService.find({
      relations: ['thread'],
    });
    await categories.reduce(async (_null, item) => {
      item.thread = await this.threadEntityService.find({
        relations: ['message'],
        where: [{ cid: item.id }],
        order: { createAt: 'DESC' },
        take: 5,
      });
    }, Promise.resolve());
    categories.filter((item) => {
      item.thread.filter((item) => {
        item.createAt = moment(item.createAt).format(DATE_FORMAT.FOMAT);
        item.updateAt = moment(item.updateAt).format(DATE_FORMAT.FOMAT);
      });
    });

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
