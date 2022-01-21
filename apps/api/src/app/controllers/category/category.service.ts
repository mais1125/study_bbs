import { Category, DATE_FORMAT } from '@common/models';
import { Injectable } from '@nestjs/common';
import { CategoryEntityService } from '@services/entities';
import moment = require('moment');

@Injectable()
export class CategoryService {
  constructor(private categoryEntityService: CategoryEntityService) {}

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
    res.thread.filter((i) => {
      i.createAt = moment(i.createAt).format(DATE_FORMAT.FOMAT);
      i.updateAt = moment(i.updateAt).format(DATE_FORMAT.FOMAT);
    });
    return res;
  }

  /**
   * スレッドを全件取得
   */
  async thradsRead(): Promise<Category[]> {
    const res = await this.categoryEntityService.find({
      relations: ['thread', 'thread.message'],
    });
    res.filter((item) =>
      item.thread.filter((item) => {
        item.createAt = moment(item.createAt).format(DATE_FORMAT.FOMAT);
        item.updateAt = moment(item.updateAt).format(DATE_FORMAT.FOMAT);
      })
    );

    return res;
  }
}
