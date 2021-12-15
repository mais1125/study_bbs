import { Thread } from '@interface/entities';

/**
 * Messageモデル
 */
export interface Message {
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
