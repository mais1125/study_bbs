/** TypeORMのEntity用AbstractInterface */
export interface TimeStamp {
  /** 登録日時 */
  createAt?: Date;
  /** 更新日時 */
  updateAt?: Date;
}
