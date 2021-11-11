import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardCreate } from '../../interface/controller/board.interface';
import { MessageId } from '../../interface/controller/messageid.interface';
import { ResCreate } from '../../interface/controller/res.interface';
import { ThreadId } from '../../interface/controller/threadid.interface';
import { Category } from '../../interface/entities/category.interface';
import { Message } from '../../interface/entities/message.interface';
import { Thread } from '../../interface/entities/thread.interface';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('message')
  create(@Body() req: BoardCreate): Promise<Message> {
    return this.boardService.create(req);
  }

  @Post('createmessage')
  createMessage(@Body() req: ResCreate): Promise<Message> {
    return this.boardService.createMessage(req);
  }

  @Get('thread')
  findOne(@Body() req: ThreadId): Promise<Thread> {
    return this.boardService.findOne(req);
  }

  @Get('threadall')
  findAll(): Promise<Thread[]> {
    return this.boardService.findAll();
  }

  @Get('category')
  findCategory(): Promise<Category[]> {
    return this.boardService.findCategory();
  }

  @Get('findmessage')
  findMessage(@Body() req: MessageId): Promise<Message> {
    return this.boardService.findMessage(req);
  }

  @Post('update')
  updateMessage(@Body() req: Message): Promise<Message> {
    return this.boardService.updateMessage(req);
  }

  @Get('delete')
  delete(@Body() req: Thread): Promise<Thread> {
    return this.boardService.delete(req);
  }

  @Get('deleteres')
  deleteRes(@Body() req: Message): Promise<Message> {
    return this.boardService.deleteRes(req);
  }
}
