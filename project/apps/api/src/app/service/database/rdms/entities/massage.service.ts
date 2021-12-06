import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { MessageEntity } from '../../../../typeorm/entities';

@Injectable()
export class MessageEntityService extends AbstractRDBMSService<MessageEntity> {
  constructor() {
    super(MessageEntity.name);
  }
}
