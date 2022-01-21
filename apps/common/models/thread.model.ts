import { Category, Message, TimeStamp, UnionProp } from './_index';

/**
 * Threadモデル
 */
export interface Thread extends TimeStamp {
  /** ID */
  id?: number;
  /** タイトル */
  title: string;
  /** カテゴリー */
  cid?: Category;
  /** 投稿 */
  message: Message[];
}

/**
 * 表示用Threadモデル
 */
export type ViewThread = UnionProp<Thread, 'createAt' | 'updateAt', string>;

/**
 * Thread投稿モデル
 */
export type BoardCreate = Pick<Thread, 'title' | 'cid'> &
  Pick<Message, 'name' | 'text' | 'editkey' | 'id'>;

/**
 * Thread取得モデル
 */
export type ThreadRead = Pick<Thread, 'title'>;
