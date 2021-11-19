import { Message } from '../entities/message.interface';

export type ResCreate = Pick<
  Message,
  'name' | 'text' | 'editkey' | 'id' | 'tid'
>;
