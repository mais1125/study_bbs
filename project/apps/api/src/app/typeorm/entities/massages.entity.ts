import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ThreadEntity } from '.';
import { Message } from '../../interface/message.interface';
import { Thread } from '../../interface/thread.interface';

@Entity('Messages')
export class MessageEntity implements Message {
  @PrimaryGeneratedColumn({ comment: 'レスID' })
  id?: number;
  @Column({ comment: '本文' })
  text: string;
  @Column({ comment: '名前' })
  name: string;
  @Column({ comment: '編集キー' })
  editkey: string;
  @ManyToOne(() => ThreadEntity, (tid) => tid.id)
  @JoinColumn()
  tid: Thread;
}
