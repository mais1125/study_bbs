import { Thread, TimeStamp, UnionProp } from './_index';

/**
 * Messageモデル
 */
export interface Message extends TimeStamp {
  /** ID */
  id?: number;
  /** 本文 */
  text: string;
  /** 名前 */
  name: string;
  /** 編集キー */
  editkey: string;
  /** 親スレッドのID */
  tid: Thread;
}

/**
 * 表示用Messageモデル
 */
export type ViewMessage = UnionProp<Message, 'createAt' | 'updateAt', string>;

/**
 * Message投稿モデル
 */
export type MessageCreate = Pick<
  Message,
  'name' | 'text' | 'editkey' | 'id' | 'tid'
>;
