import { Thread, TimeStamp } from '@interface/entities';

/** 型変換：これは他で共通として切り出していいかも（UnionPropはたくさん使いそう） */
type UnionProp<T, KEY extends keyof T, TYPE> = {
  [P in keyof T]: P extends KEY ? T[P] | TYPE : T[P];
};

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
