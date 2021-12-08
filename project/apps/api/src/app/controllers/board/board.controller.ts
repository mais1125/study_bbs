import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BoardCreate } from '../../../../../common/interfaces/interface/controller/board.interface';
import { MessageId } from '../../../../../common/interfaces/interface/controller/messageid.interface';
import { ResCreate } from '../../../../../common/interfaces/interface/controller/res.interface';
import { ThreadId } from '../../../../../common/interfaces/interface/controller/threadid.interface';
import { Category } from '../../../../../common/interfaces/interface/entities/category.interface';
import { Message } from '../../../../../common/interfaces/interface/entities/message.interface';
import { Thread } from '../../../../../common/interfaces/interface/entities/thread.interface';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('message')
  create(@Body() req: BoardCreate): Promise<boolean> {
    return this.boardService.create(req);
  }

  @Post('createmessage')
  createMessage(@Body() req: ResCreate): Promise<Message> {
    return this.boardService.createMessage(req);
  }

  @Get('thread')
  findOne(@Query() req: ThreadId): Promise<Thread> {
    return this.boardService.findOne(req);
  }

  @Get('threadall')
  findAll(): Promise<Thread[]> {
    return this.boardService.findAll();
  }

  @Get('categories')
  Categories(): Promise<Category[]> {
    return this.boardService.Categories();
  }

  @Get('category')
  findCategory(@Query() id: number): Promise<Category> {
    return this.boardService.findCategory(id);
  }

  @Get('findmessage')
  findMessage(@Body() req: MessageId): Promise<Message> {
    return this.boardService.findMessage(req);
  }

  @Post('update')
  updateMessage(@Body() req: Message): Promise<boolean> {
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
