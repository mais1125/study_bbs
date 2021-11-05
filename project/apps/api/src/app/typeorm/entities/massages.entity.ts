import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ThreadEntity } from '.';
import { Message } from '../../interface/entities/message.interface';
import { Thread } from '../../interface/entities/thread.interface';
import { AbstractEntity } from './abstract';

@Entity('Messages')
export class MessageEntity extends AbstractEntity implements Message {
  @PrimaryGeneratedColumn({ comment: 'レスID' })
  id?: number;

  @Column({ comment: '本文' })
  text: string;

  @Column({ comment: '名前' })
  name: string;

  @Column({ comment: '編集キー' })
  editkey: string;

  @ManyToOne(() => ThreadEntity, (tid) => tid.message, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tid' })
  tid: Thread;
}
