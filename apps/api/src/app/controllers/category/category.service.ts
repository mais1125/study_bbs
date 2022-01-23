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

  /**
   * スレッドを全件取得
   */
  async thradsRead(): Promise<Category[]> {
    // category を取得する
    const categories = await this.categoryEntityService.find();
    const result = categories.filter((i) => {
      i.thread.filter((i) => {
        i.cid;
        this.threadEntityService.find();
      });
    });

    // threadを取得する
    // const threads =
    return categories;
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
