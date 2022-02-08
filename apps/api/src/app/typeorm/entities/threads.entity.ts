import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity, MessageEntity } from '@entities';

import { TimeStampEntity } from './abstract';
import { BoardCreate, Category, Message, _ThreadEntity } from '@common/models';
import { IsNotEmpty } from 'class-validator';

@Entity('Threads')
export class ThreadEntity extends TimeStampEntity implements _ThreadEntity {
  @PrimaryGeneratedColumn({ comment: '親スレッドID' })
  id?: number;

  @Column({ comment: 'タイトル' })
  title: string;

  @ManyToOne(() => CategoryEntity, (cid) => cid.thread)
  @JoinColumn({ name: 'cid' })
  cid?: Category;

  @OneToMany(() => MessageEntity, (message) => message.tid)
  message: Message[];
}

export class ThreadCreate implements BoardCreate {
  cid?: Category;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  editkey: string;

  id?: number;
}
