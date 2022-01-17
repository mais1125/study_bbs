import { TimeStamp } from 'apps/common/interfaces/interface/entities/abstract';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStampEntity implements TimeStamp {
  @CreateDateColumn()
  createAt?: Date | string;

  @UpdateDateColumn()
  updateAt?: Date | string;
}
