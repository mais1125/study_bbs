import { Category, Message } from '@interface/entities';

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
