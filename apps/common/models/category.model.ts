import { _ThreadEntity } from './thread.model';
import { Thread } from './_index';

/** カテゴリータイプ */
export const CATEGORY_TYPE = {
  /** カテゴリー A */
  A: 'カテゴリA',
  /** カテゴリー B */
  B: 'カテゴリB',
  /** カテゴリー C */
  C: 'カテゴリC',
} as const;

export interface Category {
  /** cid */
  id?: number;
  /** カテゴリー */
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];
  /** スレッド */
  thread?: Thread[];
}

/**
 * CategoryEntityモデル
 */
export type _CategoryEntity = Category;

/**
 * Category取得モデル
 */
export type CategoryRead = _CategoryEntity & _ThreadEntity;
