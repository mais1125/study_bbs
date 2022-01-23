import { Injectable } from '@nestjs/common';
import { ThreadEntityService, MessageEntityService } from '@services/entities';
import {
  BoardCreate,
  DATE_FORMAT,
  Message,
  Thread,
  ViewMessage,
} from 'apps/common/models/_index';
import moment = require('moment');

@Injectable()
export class ThreadService {
  constructor(
    private threadEntityService: ThreadEntityService,
    private messageEntityService: MessageEntityService
  ) {}

  /**
   * スレッド新規投稿
   */
  async thredCreate(req: BoardCreate): Promise<boolean> {
    // スレッドに新規登録
    const thread: Partial<Thread> = {
      title: req.title,
      cid: req.cid,
    };
    const tid = await this.threadEntityService.create(thread as Thread);
    // メッセージに登録
    const message: Message = {
      tid: tid,
      text: req.text,
      name: req.name,
      editkey: req.editkey,
    };
    await this.messageEntityService.create(message);
    return true;
  }

  // /**
  //  * スレッドを全件取得
  //  */
  // async thradsRead(): Promise<ThreadEntity[]> {
  //   const res = await this.threadEntityService.find({
  //     relations: ['cid', 'message'],
  //   });
  //   res.filter((i) => {
  //     i.createAt = moment(i.createAt).format(DATE_FORMAT.FOMAT);
  //     i.updateAt = moment(i.updateAt).format(DATE_FORMAT.FOMAT);
  //   });
  //   return res;
  // }

  /**
   * スレッドを個別に取得
   */
  async threadRead(req: Pick<Thread, 'id'>): Promise<Thread> {
    const res = await this.threadEntityService.findOne(req.id, {
      relations: ['cid', 'message'],
    });
    if (res === undefined) {
      return res;
    }
    const format: ViewMessage[] = res.message;
    res.message.filter((i) => {
      const index = format.findIndex(({ id }) => id === i.id);
      format[index].createAt = moment(i.createAt).format(DATE_FORMAT.FOMAT);
      format[index].updateAt = moment(i.updateAt).format(DATE_FORMAT.FOMAT);
    });

    return res;
  }
}
