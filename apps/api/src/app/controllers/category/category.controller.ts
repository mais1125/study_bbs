import { API_ENDPOINT } from '@interface/controllers';
import { Category } from '@interface/entities';
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from '@services/controllers';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  /**
   * カテゴリーの取得
   */
  @Get(API_ENDPOINT.CATEGORIES_READ)
  categoriesRead(): Promise<Category[]> {
    return this.categoryService.categoriesRead();
  }

  /**
   * カテゴリーごとにスレッドの取得
   */
  @Get(API_ENDPOINT.CATEGORY_READ)
  categoryRead(@Query() id: number): Promise<Category> {
    return this.categoryService.categoryRead(id);
  }
}
