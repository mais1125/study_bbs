import { Body, Controller, Post } from '@nestjs/common';
import { Message } from '../../interface/message.interface';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private boardControllerService: BoardService) {}

  @Post('message')
  create(@Body() body: Message): Promise<Message> {
    return this.boardControllerService.create(body);
  }
}
