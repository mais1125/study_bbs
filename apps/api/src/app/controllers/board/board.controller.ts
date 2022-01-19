// import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { BoardService } from './board.service';
// // Entities Interface
// import { Category, Message, Thread } from '@interface/entities';
// // controllers Interface
// import {
//   API_ENDPOINT,
//   BoardCreate,
//   ResCreate,
//   ResponseInterface,
// } from '@interface/controllers';

// @Controller()
// export class BoardController {
//   constructor(private boardService: BoardService) {}

//   @Post(API_ENDPOINT.THREAD_CREATE)
//   create(@Body() req: BoardCreate): Promise<boolean> {
//     return this.boardService.create(req);
//   }

//   @Post(API_ENDPOINT.MESSAGE_CREATE)
//   createMessage(@Body() req: ResCreate): Promise<Message> {
//     return this.boardService.createMessage(req);
//   }

//   @Get(API_ENDPOINT.THREAD_READ)
//   async findOne(@Query() req: Pick<Thread, 'id'>): Promise<Thread> {
//     const res = await this.boardService.findOne(req);
//     return res;
//   }

//   @Get(API_ENDPOINT.THREADS_READ)
//   findAll(): Promise<Thread[]> {
//     return this.boardService.findAll();
//   }

//   @Get(API_ENDPOINT.CATEGORIES_READ)
//   categories(): Promise<Category[]> {
//     return this.boardService.categories();
//   }

//   @Get(API_ENDPOINT.CATEGORY_READ)
//   findCategory(@Query() id: number): Promise<Category> {
//     return this.boardService.findCategory(id);
//   }

//   @Get()
//   @Get(API_ENDPOINT.MESSAGE_READ)
//   findMessage(@Body() req: Message): Promise<Message> {
//     return this.boardService.findMessage(req);
//   }

//   @Post(API_ENDPOINT.MESSAGE_UPDATE)
//   updateMessage(@Body() req: Message): Promise<ResponseInterface> {
//     return this.boardService.updateMessage(req);
//   }

//   @Post(API_ENDPOINT.MESSAGE_DELETE)
//   delete(@Body() req: Message): Promise<ResponseInterface> {
//     return this.boardService.delete(req);
//   }
// }
