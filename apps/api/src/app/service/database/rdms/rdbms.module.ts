import { Module } from '@nestjs/common';
import {
  CategoryEntityService,
  MessageEntityService,
  ThreadEntityService,
} from '@services/entities';

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
