import { Category, Message, TimeStamp, UnionProp } from './_index';

/**
 * Threadモデル
 */
export interface Thread {
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
 * ThreadEntityモデル
 */
export type _ThreadEntity = Thread & TimeStamp;

/**
 * 表示用Threadモデル
 */
export type ViewThread = UnionProp<
  _ThreadEntity,
  'createAt' | 'updateAt',
  string
>;

/**
 * Thread投稿モデル
 */
export type BoardCreate = Pick<Thread, 'title' | 'cid'> &
  Pick<Message, 'name' | 'text' | 'editkey' | 'id'>;

/**
 * Thread取得モデル
 */
export type ThreadRead = _ThreadEntity & {
  /** 総取得件数 */
  total: number;
};
