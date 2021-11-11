import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
// entitysInterface
import { Category } from '../../interface/entities/category.interface';
import { Message } from '../../interface/entities/message.interface';
import { Thread } from '../../interface/entities/thread.interface';
// controllerInterface
import { BoardCreate } from '../../interface/controller/board.interface';
import { ResCreate } from '../../interface/controller/res.interface';
import { MessageId } from '../../interface/controller/messageid.interface';
import { ThreadId } from '../../interface/controller/threadid.interface';
// service
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
  async updateMessage(req: Message): Promise<Message> {
    const editMessage = await this.findMessage(req);
    editMessage.name = req.name;
    editMessage.text = req.text;
    return this.messageEntityService.update(editMessage);
  }

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
    const message = await this.findMessage(req);
    const thread = await this.findOne(message.tid);
    // 対象スレッドの一番若いメッセージIDとリクエストIDが同じならばスレッドも同時に削除
    if (message.editkey === req.editkey) {
      if (thread.message[0].id === req.id) {
        await this.delete(thread);
      } else {
        // 配列の１番初めでなければ該当のレスのみ１件削除
        await this.messageEntityService.delete(req);
      }
    } else {
      throw new NotFoundException();
    }
    return true;
  }
}
