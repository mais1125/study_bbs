import { Category } from '@common/models';
import { Injectable } from '@nestjs/common';
import { CategoryEntityService } from '@services/entities';
import { FindOneOptions } from 'typeorm';

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
    const options: FindOneOptions<Category> = { relations: ['thread'] };
    return await this.categoryEntityService.findOne(id, options);
  }
}
