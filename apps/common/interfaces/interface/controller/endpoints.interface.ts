export const API_ENDPOINT = {
  /** スレッド読み込み */
  THREAD: 'thread',
  /** 全スレッド読み込み */
  THREAD_ALL: 'threadall',
  /** カテゴリーを読み込み */
  CATEGORIES: 'categories',
  /** カテゴリーごとに読み込み */
  CATEGORY: 'category',
  /** 新規投稿 */
  MESSAGE: 'message',
  /** 返信投稿 */
  RES: 'createmessage',
  /** レスの編集 */
  EDIT: 'update',
  /** レスを削除 */
  DELETE_MESSAGE: 'delete',
} as const;
