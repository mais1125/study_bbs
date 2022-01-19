import {
  API_ENDPOINT,
  Message,
  MessageCreate,
  ResponseInterface,
} from '@common/models';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from '@services/controllers';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  /**
   *  メッセージを投稿
   */
  @Post(API_ENDPOINT.MESSAGE_CREATE)
  messageCreate(@Body() req: MessageCreate): Promise<Message> {
    return this.messageService.messageCreate(req);
  }
  /**
   *  メッセージの取得
   */
  @Get(API_ENDPOINT.MESSAGE_READ)
  messageRead(@Body() req: Message): Promise<Message> {
    return this.messageService.messageRead(req);
  }

  /**
   * メッセージを更新
   */
  @Post(API_ENDPOINT.MESSAGE_UPDATE)
  messageUpdate(@Body() req: Message): Promise<ResponseInterface> {
    return this.messageService.messageUpdate(req);
  }

  /**
   * メッセージ削除
   */
  @Post(API_ENDPOINT.MESSAGE_DELETE)
  delete(@Body() req: Message): Promise<ResponseInterface> {
    return this.messageService.delete(req);
  }
}
