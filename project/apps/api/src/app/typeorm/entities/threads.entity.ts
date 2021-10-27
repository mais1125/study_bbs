import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity, MessageEntity } from '.';
import { Category } from '../../interface/category.interface';
import { Message } from '../../interface/message.interface';
import { Thread } from '../../interface/thread.interface';

@Entity('Threads')
export class ThreadEntity implements Thread {
  @PrimaryGeneratedColumn({ comment: '親スレッドID' })
  id?: number;
  @Column({ comment: 'タイトル' })
  title: string;
  @ManyToOne(() => CategoryEntity, (cid) => cid.id)
  @JoinTable()
  cid: Category;
  @OneToMany(() => MessageEntity, (message) => message.id)
  message?: Message[];
}
