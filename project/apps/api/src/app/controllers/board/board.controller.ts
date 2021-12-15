import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
// Entities Interface
import { Category, Message, Thread } from '@interface/entities';
// controllers Interface
import {
  BoardCreate,
  ResCreate,
  ResponseInterface,
} from '@interface/controllers';

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
  async findOne(@Query() req: Pick<Thread, 'id'>): Promise<Thread> {
    const res = await this.boardService.findOne(req);
    return res;
  }

  @Get('threadall')
  findAll(): Promise<Thread[]> {
    return this.boardService.findAll();
  }

  @Get('categories')
  categories(): Promise<Category[]> {
    return this.boardService.categories();
  }

  @Get('category')
  findCategory(@Query() id: number): Promise<Category> {
    return this.boardService.findCategory(id);
  }

  @Get('findmessage')
  findMessage(@Body() req: Message): Promise<Message> {
    return this.boardService.findMessage(req);
  }

  @Post('update')
  updateMessage(@Body() req: Message): Promise<ResponseInterface> {
    return this.boardService.updateMessage(req);
  }

  @Post('delete')
  delete(@Body() req: Message): Promise<ResponseInterface> {
    return this.boardService.delete(req);
  }
}
