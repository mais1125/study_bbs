import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeORM } from '@nestjs/typeorm';
import TypeOrmOptions from './typeorm.config';

// Entities
import { ThreadEntity, CategoryEntity, MessageEntity } from './entities';
const entities = [ThreadEntity, CategoryEntity, MessageEntity];
@Module({
  imports: [TypeORM.forRoot(TypeOrmOptions), TypeORM.forFeature([...entities])],
  exports: [TypeORM.forFeature([...entities])],
})
export class TypeOrmModule {}
