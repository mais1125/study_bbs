import { ResCreate, ResponseInterface } from '@interface/controllers';
import { Message } from '@interface/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageEntityService, ThreadEntityService } from '@services/entities';
import { ThreadService } from '@services/controllers';

@Injectable()
export class MessageService {
  constructor(
    private messageEntityService: MessageEntityService,
    private threadService: ThreadService,
    private threadEntityService: ThreadEntityService
  ) {}

  /**
   *  メッセージを投稿
   */
  async messageCreate(req: ResCreate): Promise<Message> {
    const newMessage: Message = {
      text: req.text,
      name: req.name,
      editkey: req.editkey,
      tid: req.tid,
    };
    return await this.messageEntityService.create(newMessage as Message);
  }

  /**
   *  メッセージの取得
   */
  async messageRead(req: Message): Promise<Message> {
    const options = { relations: ['tid'] };
    const res = await this.messageEntityService.findOne(req.id, options);
    return res;
  }

  /**
   * メッセージを更新
   */
  async messageUpdate(req: Message): Promise<ResponseInterface> {
    // editkeyが一致している場合はtrue
    if (await this.checkEditKey(req)) {
      const result: ResponseInterface = {
        status: false,
        message: '編集keyが違います。',
      };
      return result;
    }
    const editMessage = await this.messageRead(req);

    // editkeyが一致していれば新たに値を書き込む(IDが一致する値に上書き)
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
   * メッセージ削除
   */
  async delete(req: Message): Promise<ResponseInterface> {
    // editkeyが一致している場合はtrue
    if (await this.checkEditKey(req)) {
      const result: ResponseInterface = {
        status: false,
        message: '編集keyが違います。',
      };
      return result;
    }
    // 対象のメッセージを取得
    const message = await this.messageRead(req);
    const thread = await this.threadService.findOne(message.tid);
    // const thread = await this.findOne(message.tid);
    // 削除対象が親コメントの場合はスレッドごと削除する
    if (thread.message[0].id === req.id) {
      await this.threadEntityService.delete(thread);
    } else {
      await this.messageEntityService.delete(req);
    }
    const result: ResponseInterface = {
      status: true,
    };
    return result;
  }

  /**
   * EditKeyの評価
   */
  async checkEditKey(req: Message): Promise<boolean> {
    // editkeyを取得
    const pass = await this.messageEntityService.findOne(req.id, {
      select: ['editkey'],
    });
    // editkeyが見つからない時はエラー
    if (!pass.editkey) {
      throw new BadRequestException();
    }
    return pass.editkey !== req.editkey;
  }
}
