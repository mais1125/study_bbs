import { API_ENDPOINT, Thread } from '@common/models';
import { ThreadCreate } from '@entities';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ThreadService } from '@services/controllers';

@Controller()
export class ThreadController {
  constructor(private threadService: ThreadService) {}

  /**
   * スレッドの投稿
   */
  @Post(API_ENDPOINT.THREAD_CREATE)
  thredCreate(@Body() req: ThreadCreate): Promise<boolean> {
    return this.threadService.thredCreate(req);
  }

  // /**
  //  * スレッドの全件取得
  //  */
  // @Get(API_ENDPOINT.ALL_READ)
  // thradsRead(): Promise<Thread[]> {
  //   return this.threadService.thradsRead();
  // }

  /**
   * スレッドの個別取得
   */
  @Get(API_ENDPOINT.THREAD_READ)
  async threadRead(@Query() req: Pick<Thread, 'id'>): Promise<Thread> {
    const res = await this.threadService.threadRead(req);
    return res;
  }
}
