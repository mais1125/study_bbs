import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { MessageEntity } from '../../../../typeorm/entities';
import { Message } from '../../../../../../../common/interfaces/interface/entities/message.interface';

@Injectable()
export class MessageEntityService extends AbstractRDBMSService<Message> {
  constructor() {
    super(MessageEntity.name);
  }
}
