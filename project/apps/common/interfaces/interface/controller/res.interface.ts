import { Message } from '@interface/entities';

export type ResCreate = Pick<
  Message,
  'name' | 'text' | 'editkey' | 'id' | 'tid'
>;
