import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { ThreadEntity } from '../../../../typeorm/entities';
import { Thread } from '../../../../../../../common/interfaces/interface/entities/thread.interface';

@Injectable()
export class ThreadEntityService extends AbstractRDBMSService<Thread> {
  constructor() {
    super(ThreadEntity.name);
  }
}
