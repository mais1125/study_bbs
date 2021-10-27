import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { ThreadEntity } from '../../../../typeorm/entities';
import { Thread } from '../../../../interface/thread.interface';

@Injectable()
export class ThreadEntityService extends AbstractRDBMSService<Thread> {
  constructor() {
    super(ThreadEntity.name);
  }
}
