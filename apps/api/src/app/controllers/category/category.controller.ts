import { Controller, Get, Query } from '@nestjs/common';
import { RxJSService } from '@services/controllers';
import { API_ENDPOINT, Category } from '@common/models';

@Controller()
export class CategoryController {
  constructor(private rxjsService: RxJSService) {}

  /**
   * スレッドの全件取得
   */
  @Get(API_ENDPOINT.ALL_READ)
  allRead(): Promise<Category[]> {
    return this.rxjsService.allRead();
  }

  /**
   * カテゴリーごとにスレッドの取得
   */
  @Get(API_ENDPOINT.CATEGORY_READ)
  categoryRead(@Query() id: number): Promise<Category> {
    return this.rxjsService.categoryRead(id);
  }
}
