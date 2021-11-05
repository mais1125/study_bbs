import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
  @CreateDateColumn({ select: false })
  createAt?: Date;

  @UpdateDateColumn({ select: false })
  updateAt?: Date;
}
