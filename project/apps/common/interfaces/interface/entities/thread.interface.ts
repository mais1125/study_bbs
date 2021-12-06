import { Category } from './category.interface';
import { Message } from './message.interface';

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
  message?: Message[];
}
