/** 日付フォーマットモデル */
export const DATE_FORMAT = {
  /** YYYY/MM/DD HH:mm:ss */
  FOMAT: 'YYYY/MM/DD HH:mm:ss',
} as const;

/** TypeORMのEntity用AbstractInterface */
export interface TimeStamp {
  /** 登録日時 */
  createAt?: Date | string;
  /** 更新日時 */
  updateAt?: Date | string;
}

/** 実行結果の状態モデル */
export interface ResponseInterface {
  /** 実行結果の状態 */
  status: boolean;
  /** メッセージ */
  message?: string;
}
