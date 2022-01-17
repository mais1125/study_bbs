import { Thread } from '@interface/entities';

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
