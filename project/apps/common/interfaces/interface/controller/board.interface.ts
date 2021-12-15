import { Thread, Message } from '@interface/entities';

export type BoardCreate = Pick<Thread, 'title' | 'cid'> &
  Pick<Message, 'name' | 'text' | 'editkey' | 'id'>;

export type ThreadRead = Pick<Thread, 'title'>;
