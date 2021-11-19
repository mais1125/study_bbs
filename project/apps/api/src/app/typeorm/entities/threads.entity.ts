import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity, MessageEntity } from '.';
import { Category } from '../../../../../common/interfaces/interface/entities/category.interface';
import { Message } from '../../../../../common/interfaces/interface/entities/message.interface';
import { Thread } from '../../../../../common/interfaces/interface/entities/thread.interface';
import { AbstractEntity } from './abstract';

@Entity('Threads')
export class ThreadEntity extends AbstractEntity implements Thread {
  @PrimaryGeneratedColumn({ comment: '親スレッドID' })
  id?: number;

  @Column({ comment: 'タイトル' })
  title: string;

  @ManyToOne(() => CategoryEntity, (cid) => cid.thread)
  @JoinColumn({ name: 'cid' })
  cid: Category;

  @OneToMany(() => MessageEntity, (message) => message.tid)
  message?: Message[];
}
