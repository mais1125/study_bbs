import { Module } from '@nestjs/common';
import {
  CategoryEntityService,
  MessageEntityService,
  ThreadEntityService,
} from '@services';

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
