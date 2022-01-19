import { Category, Message, TimeStamp } from './_index';

/** 型変換：これは他で共通として切り出していいかも（UnionPropはたくさん使いそう） */
type UnionProp<T, KEY extends keyof T, TYPE> = {
  [P in keyof T]: P extends KEY ? T[P] | TYPE : T[P];
};

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
