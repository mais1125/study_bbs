import { Message, Thread } from 'apps/common/models/_index';
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

  @Column({ comment: '本文' })
  text: string;

  @Column({ comment: '名前' })
  name: string;

  @Column({ name: 'editkey', select: false })
  editkey: string;

  @ManyToOne(() => ThreadEntity, (tid) => tid.message, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tid' })
  tid: Thread;
}
