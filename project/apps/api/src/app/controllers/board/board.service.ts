import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
// entitysInterface
import { Category } from '../../../../../common/interfaces/interface/entities/category.interface';
import { Message } from '../../../../../common/interfaces/interface/entities/message.interface';
import { Thread } from '../../../../../common/interfaces/interface/entities/thread.interface';
// controllerInterface
import { BoardCreate } from '../../../../../common/interfaces/interface/controller/board.interface';
import { ResCreate } from '../../../../../common/interfaces/interface/controller/res.interface';
import { MessageId } from '../../../../../common/interfaces/interface/controller/messageid.interface';
import { ThreadId } from '../../../../../common/interfaces/interface/controller/threadid.interface';
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
  async create(req: BoardCreate): Promise<boolean> {
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
    await this.messageEntityService.create(message);
    return true;
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
    const res = await this.threadEntityService.findOne(req.id, options);
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
   * カテゴリーを取得
   */
  async Categories(): Promise<Category[]> {
    return await this.categoryEntityService.find();
  }

  /**
   * カテゴリーごとに取得
   */
  async findCategory(id: number): Promise<Category> {
    const options: FindOneOptions<Category> = { relations: ['thread'] };
    return await this.categoryEntityService.findOne(id, options);
  }

  /** メッセージを取得 */
  async findMessage(req: MessageId): Promise<Message> {
    const options = { relations: ['tid'] };
    const res = await this.messageEntityService.findOne(req as number, options);
    return res;
  }

  /**
   * メッセージを更新
   */
  async updateMessage(req: Message): Promise<Message> {
    const editMessage = await this.findMessage(req.id as MessageId);
    // editkyeが一致しているか照合
    if (editMessage.editkey !== req.editkey) {
      throw new BadRequestException();
    }
    // editkyeが一致していれば新たに値を書き込む(IDが一致する値に上書き)
    const updateMassage: Partial<Message> = {
      id: editMessage.id,
      text: req.text,
      name: req.name,
    };
    return await this.messageEntityService.update(updateMassage as Message);
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
  async deleteRes(req: Message): Promise<Message> {
    // 対象のスレッドを取得
    const message = await this.findMessage(req.id as MessageId);
    const thread = await this.findOne(message.tid);
    // editkyeが一致しているか照合
    if (message.editkey !== req.editkey) {
      throw new BadRequestException();
    }
    // 対象スレッドの一番若いメッセージIDとリクエストIDが同じならばスレッドも同時に削除
    if (thread.message[0].id === req.id) {
      await this.delete(thread);
    } else {
      // 配列の１番初めでなければ該当のレスのみ１件削除
      await this.messageEntityService.delete(req);
    }
    return;
  }
}
