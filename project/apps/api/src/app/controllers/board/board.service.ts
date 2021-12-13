import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
// entitysInterface
import { Category, Message, Thread } from '@interface/entities';
// controllerInterface
import {
  BoardCreate,
  ResCreate,
  ResponseInterface,
} from '@interface/controllers';
// service
import {
  CategoryEntityService,
  MessageEntityService,
  ThreadEntityService,
} from '@services';

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
      text: req.text,
      name: req.name,
      editkey: req.editkey,
      tid: req.tid,
    };
    return await this.messageEntityService.create(newMessage);
  }

  /**
   * 個別に取得
   */
  async findOne(req: Pick<Thread, 'id'>): Promise<Thread> {
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
  async findMessage(req: Pick<Message, 'id'>): Promise<Message> {
    const options = { relations: ['tid'] };

    const res = await this.messageEntityService.findOne(req as number, options);
    return res;
  }

  /**
   * メッセージを更新
   */
  async updateMessage(req: Message): Promise<ResponseInterface> {
    const editMessage = await this.findMessage(req.id as Pick<Message, 'id'>);
    // editkyeを取得
    const pass = await this.messageEntityService.findOne(req.id, {
      select: ['editkey'],
    });
    // editkyeが見つからない時
    if (!pass.editkey) {
      throw new BadRequestException();
    }
    // editkyeが一致しているか照合
    if (pass.editkey !== req.editkey) {
      const result: ResponseInterface = {
        status: false,
        message: '編集kyeが違います',
      };
      return result;
    }
    // editkyeが一致していれば新たに値を書き込む(IDが一致する値に上書き)
    const updateMassage: Partial<Message> = {
      id: editMessage.id,
      text: req.text,
      name: req.name,
    };
    await this.messageEntityService.update(updateMassage as Message);
    const result: ResponseInterface = {
      status: true,
    };
    return result;
  }

  /**
   * スレッド削除
   */
  async delete(req: Thread): Promise<ResponseInterface> {
    await this.threadEntityService.delete(req);
    const result: ResponseInterface = {
      status: true,
    };
    return result;
  }

  /**
   * メッセージ削除
   */
  async deleteRes(req: Message): Promise<ResponseInterface> {
    // 対象のスレッド取得
    const message = await this.findMessage(req.id as Pick<Message, 'id'>);
    // editkeyを取得
    const pass = await this.messageEntityService.findOne(req.id, {
      select: ['editkey'],
    });
    const thread = await this.findOne(message.tid);
    // editkyeが見つからない時
    if (!pass.editkey) {
      throw new BadRequestException();
    }
    // editkeyが一致しているか照合
    if (pass.editkey !== req.editkey) {
      const result: ResponseInterface = {
        status: false,
        message: '編集kyeが違います',
      };
      return result;
    }
    // 対象スレッドの一番若いメッセージIDとリクエストIDが同じならばスレッドも同時に削除
    if (thread.message[0].id === req.id) {
      const result: ResponseInterface = await this.delete(thread);
      return result;
    } else {
      // 配列の１番初めでなければ該当のレスのみ１件削除
      await this.messageEntityService.delete(req);
      const result: ResponseInterface = {
        status: true,
      };
      return result;
    }
  }
}
