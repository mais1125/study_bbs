import { Module } from '@nestjs/common';
import { CategoryEntityService } from './entities/category.service';
import { MessageEntityService } from './entities/massage.service';
import { ThreadEntityService } from './entities/thread.service';

const entitiesService = [
  CategoryEntityService,
  MessageEntityService,
  ThreadEntityService,
];

@Module({
  providers: [...entitiesService],
  exports: [...entitiesService],
})
export class RDBMSModule {}
