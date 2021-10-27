import { Injectable } from '@nestjs/common';
import { Message } from '../../interface/message.interface';
import { Thread } from '../../interface/thread.interface';
import { MessageEntityService } from '../../service/database/rdms/entities/massage.service';
import { ThreadEntityService } from '../../service/database/rdms/entities/thread.service';

@Injectable()
export class BoardService {
  constructor(
    private threadEntityService: ThreadEntityService,
    private messageEntityService: MessageEntityService
  ) {}
  /**
   * 新規投稿
   */
  async create(body: Message): Promise<Message> {
    // スレッドに登録
    const thread: Thread = {
      title: body.tid.title,
      cid: body.tid.cid,
    };
    const tid = await this.threadEntityService.create(thread);
    // メッセージに登録
    const message: Message = {
      tid: tid,
      text: body.text,
      name: body.name,
      editkey: body.editkey,
    };
    return await this.messageEntityService.create(message);
  }
}
