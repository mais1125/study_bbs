import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity, MessageEntity } from '@entities';
import { Category, Message, Thread } from '@interface/entities';
import { TimeStampEntity } from './abstract';

@Entity('Threads')
export class ThreadEntity extends TimeStampEntity implements Thread {
  @PrimaryGeneratedColumn({ comment: '親スレッドID' })
  id?: number;

  @Column({ comment: 'タイトル' })
  title: string;

  @ManyToOne(() => CategoryEntity, (cid) => cid.thread)
  @JoinColumn({ name: 'cid' })
  cid?: Category;

  @OneToMany(() => MessageEntity, (message) => message.tid)
  message?: Message[];
}
