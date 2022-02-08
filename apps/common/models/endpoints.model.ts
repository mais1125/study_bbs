/** API ENDPOINT */
export const API_ENDPOINT = {
  /** カテゴリーごとの読み込み */
  CATEGORY_READ: 'categoryread',

  /** スレッドの投稿 */
  THREAD_CREATE: 'threadcreate',

  /** スレッド読み込み */
  THREAD_READ: 'threadread',

  /** 全スレッドの読み込み */
  ALL_READ: 'allread',

  /** メッセージの投稿 */
  MESSAGE_CREATE: 'messagecreate',

  /** メッセージの読み込み */
  MESSAGE_READ: 'messageread',

  /** メッセージの編集 */
  MESSAGE_UPDATE: 'messageupdate',

  /** メッセージの削除 */
  MESSAGE_DELETE: 'messagedelete',
} as const;
