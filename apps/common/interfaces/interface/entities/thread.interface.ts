// import { Category, Message, TimeStamp } from '@interface/entities';

// /** 型変換：これは他で共通として切り出していいかも（UnionPropはたくさん使いそう） */
// type UnionProp<T, KEY extends keyof T, TYPE> = {
//   [P in keyof T]: P extends KEY ? T[P] | TYPE : T[P];
// };

// /**
//  * Threadモデル
//  */
// export interface Thread extends TimeStamp {
//   /** ID */
//   id?: number;
//   /** タイトル */
//   title: string;
//   /** カテゴリー */
//   cid?: Category;
//   /** 投稿 */
//   message: Message[];
// }

// /**
//  * 表示用Threadモデル
//  */
// export type ViewThread = UnionProp<Thread, 'createAt' | 'updateAt', string>;
