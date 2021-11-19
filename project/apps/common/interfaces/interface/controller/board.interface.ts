import { Message } from '../entities/message.interface';
import { Thread } from '../entities/thread.interface';

export type BoardCreate = Pick<Thread, 'title' | 'cid'> &
  Pick<Message, 'name' | 'text' | 'editkey' | 'id'>;

export type ThreadRead = Pick<Thread, 'title'>;
