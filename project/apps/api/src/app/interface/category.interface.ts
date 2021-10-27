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
  /** カテゴリー */
  name: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];
}
