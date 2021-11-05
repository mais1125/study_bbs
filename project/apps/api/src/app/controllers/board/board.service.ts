import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, MaxKey } from 'typeorm';
import { BoardCreate } from '../../interface/controller/board.interface';
import { MessageId } from '../../interface/controller/messageid.interface';
import { ResCreate } from '../../interface/controller/res.interface';
import { ThreadId } from '../../interface/controller/threadid.interface';
import { Category } from '../../interface/entities/category.interface';
import { Message } from '../../interface/entities/message.interface';
import { Thread } from '../../interface/entities/thread.interface';
import { CategoryEntityService } from '../../service/database/rdms/entities/category.service';
import { MessageEntityService } from '../../service/database/rdms/entities/massage.service';
import { ThreadEntityService } from '../../service/database/rdms/entities/thread.service';

@Injectable()
export class BoardService {
  constructor(
    private threadEntityService: ThreadEntityService,
    private messageEntityService: MessageEntityService,
    private categoryEntityService: CategoryEntityService
  ) {}
  /**
   * スレッド新規投稿
   */
  async create(req: BoardCreate): Promise<Message> {
    // スレッドに新規登録
    const thread: Thread = {
      title: req.title,
      cid: req.cid,
    };
    const tid = await this.threadEntityService.create(thread);
    // メッセージに登録
    const message: Message = {
      tid: tid,
      text: req.text,
      name: req.name,
      editkey: req.editkey,
    };
    return await this.messageEntityService.create(message);
  }

  /**
   *  レス新規投稿
   */
  async createMessage(req: ResCreate): Promise<Message> {
    const newMessage: Message = {
      tid: req.tid,
      text: req.text,
      name: req.name,
      editkey: req.editkey,
    };
    return await this.messageEntityService.create(newMessage);
  }

  /**
   * 個別に取得
   */
  async findOne(req: ThreadId): Promise<Thread> {
    const options: FindOneOptions<Thread> = {
      relations: ['cid', 'message'],
      // order: {
      //   message: 'ASC',
      // },
    };
    const res = await this.threadEntityService.findOne(req, options);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  /**
   * 全て取得
   */
  async findAll(): Promise<Thread[]> {
    const options = { relations: ['cid'] };
    return await this.threadEntityService.find(options);
  }

  /**
   * カテゴリーごとに取得
   */
  async findCategory(): Promise<Category[]> {
    const options = { relations: ['thread'] };

    return await this.categoryEntityService.find(options);
  }

  /** メッセージを取得 */
  async findMessage(req: MessageId): Promise<Message> {
    const options = { relations: ['tid'] };
    return await this.messageEntityService.findOne(req, options);
  }

  /**
   * メッセージを更新
   */
  // async updateMessage(req: Message): Promise<Message> {
  //   const item: Message = await this.findMessage(req.id);
  //   if (!item) {
  //     throw new NotFoundException();
  //   }
  //   item.name = req.name;
  //   item.text = req.text;
  //   return this.messageEntityService.update(item);
  // }

  /**
   * スレッド削除
   */
  delete(req: Thread): Promise<Thread> {
    return this.threadEntityService.delete(req);
  }

  /**
   * メッセージ削除
   */
  async deleteRes(req: Message): Promise<any> {
    // 対象のスレッドを取得
    const thread = await this.findOne(req);
    return;
    // 対象スレッドの一番若いメッセージIDを取得

    // if (req.id === 1) {
    //   const del = await this.findMessage(req);
    //   this.delete(del.tid);
    // } else {
    //   return await this.messageEntityService.delete(req);
    // }
  }
}
