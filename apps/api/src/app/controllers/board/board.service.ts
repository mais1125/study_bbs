// import { BadRequestException, Injectable } from '@nestjs/common';
// import { FindOneOptions } from 'typeorm';
// import moment = require('moment');
// // entitysInterface
// import { Category, ViewMessage, Message, Thread } from '@interface/entities';
// // controllerInterface
// import {
//   BoardCreate,
//   ResCreate,
//   ResponseInterface,
//   DATE_FORMAT,
// } from '@interface/controllers';
// // service
// import {
//   CategoryEntityService,
//   MessageEntityService,
//   ThreadEntityService,
// } from '@services';
// import { ThreadEntity } from '../../typeorm/entities/threads.entity';

// @Injectable()
// export class BoardService {
//   constructor(
//     private threadEntityService: ThreadEntityService,
//     private messageEntityService: MessageEntityService,
//     private categoryEntityService: CategoryEntityService
//   ) {}
//   /**
//    * スレッド新規投稿
//    */
//   async create(req: BoardCreate): Promise<boolean> {
//     // スレッドに新規登録
//     const thread: Partial<Thread> = {
//       title: req.title,
//       cid: req.cid,
//     };
//     const tid = await this.threadEntityService.create(thread as Thread);
//     // メッセージに登録
//     const message: Message = {
//       tid: tid,
//       text: req.text,
//       name: req.name,
//       editkey: req.editkey,
//     };
//     await this.messageEntityService.create(message);
//     return true;
//   }

//   /**
//    *  レス新規投稿
//    */
//   async createMessage(req: ResCreate): Promise<Message> {
//     const newMessage: Message = {
//       text: req.text,
//       name: req.name,
//       editkey: req.editkey,
//       tid: req.tid,
//     };
//     return await this.messageEntityService.create(newMessage as Message);
//   }

//   /**
//    * スレッドを個別に取得
//    */
//   async findOne(req: Pick<Thread, 'id'>): Promise<Thread> {
//     const options: FindOneOptions<Thread> = {
//       relations: ['cid', 'message'],
//     };
//     const res = await this.threadEntityService.findOne(req.id, options);
//     if (res === undefined) {
//       return res;
//     }
//     const hoge: ViewMessage[] = res.message;
//     res.message.filter((i) => {
//       const index = hoge.findIndex(({ id }) => id === i.id);
//       hoge[index].createAt = moment(i.createAt).format(DATE_FORMAT.FOMAT);
//       hoge[index].updateAt = moment(i.updateAt).format(DATE_FORMAT.FOMAT);
//     });

//     return res;
//   }

//   /**
//    * 記事を全件取得
//    */
//   async findAll(): Promise<ThreadEntity[]> {
//     const options = { relations: ['cid', 'message'] };
//     const res = await this.threadEntityService.find(options);
//     res.filter((i) => {
//       i.createAt = moment(i.createAt).format(DATE_FORMAT.FOMAT);
//       i.updateAt = moment(i.updateAt).format(DATE_FORMAT.FOMAT);
//     });
//     return res;
//   }

//   /**
//    * カテゴリーを取得
//    */
//   async categories(): Promise<Category[]> {
//     return await this.categoryEntityService.find();
//   }

//   /**
//    * カテゴリーごとにスレッドを取得
//    */
//   async findCategory(id: number): Promise<Category> {
//     const options: FindOneOptions<Category> = { relations: ['thread'] };
//     return await this.categoryEntityService.findOne(id, options);
//   }

//   /** メッセージを取得 */
//   async findMessage(req: Message): Promise<Message> {
//     const options = { relations: ['tid'] };
//     const res = await this.messageEntityService.findOne(req.id, options);
//     return res;
//   }

//   /**
//    * メッセージを更新
//    */
//   async updateMessage(req: Message): Promise<ResponseInterface> {
//     // editkeyが一致している場合はtrue
//     if (await this.checkEditKey(req)) {
//       const result: ResponseInterface = {
//         status: false,
//         message: '編集keyが違います。',
//       };
//       return result;
//     }

//     const editMessage = await this.findMessage(req);

//     // editkeyが一致していれば新たに値を書き込む(IDが一致する値に上書き)
//     const updateMassage: Partial<Message> = {
//       id: editMessage.id,
//       text: req.text,
//       name: req.name,
//     };
//     await this.messageEntityService.update(updateMassage as Message);
//     const result: ResponseInterface = {
//       status: true,
//     };
//     return result;
//   }

//   /**
//    * メッセージ削除
//    */
//   async delete(req: Message): Promise<ResponseInterface> {
//     // editkeyが一致している場合はtrue
//     if (await this.checkEditKey(req)) {
//       const result: ResponseInterface = {
//         status: false,
//         message: '編集keyが違います。',
//       };
//       return result;
//     }
//     // 対象のメッセージを取得
//     const message = await this.findMessage(req);
//     const thread = await this.findOne(message.tid);
//     // 削除対象が親コメントの場合はスレッドごと削除する
//     if (thread.message[0].id === req.id) {
//       await this.threadEntityService.delete(thread);
//     } else {
//       await this.messageEntityService.delete(req);
//     }
//     const result: ResponseInterface = {
//       status: true,
//     };
//     return result;
//   }

//   /**
//    * EditKeyの評価
//    */
//   async checkEditKey(req: Message): Promise<boolean> {
//     // editkeyを取得
//     const pass = await this.messageEntityService.findOne(req.id, {
//       select: ['editkey'],
//     });
//     // editkeyが見つからない時はエラー
//     if (!pass.editkey) {
//       throw new BadRequestException();
//     }
//     return pass.editkey !== req.editkey;
//   }
// }
