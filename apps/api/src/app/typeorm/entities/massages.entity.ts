import { Message, Thread } from 'apps/common/models/_index';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ThreadEntity } from '.';

import { TimeStampEntity } from './abstract';

@Entity('Messages')
export class MessageEntity extends TimeStampEntity implements Message {
  @PrimaryGeneratedColumn({ comment: 'レスID' })
  id?: number;

  @IsNotEmpty()
  @Column({ comment: '本文' })
  text: string;

  @IsNotEmpty()
  @Column({ comment: '名前' })
  name: string;

  @IsNotEmpty()
  @Column({ name: 'editkey', select: false })
  editkey: string;

  @ManyToOne(() => ThreadEntity, (tid) => tid.message, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tid' })
  tid: Thread;
}
