import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeORM } from '@nestjs/typeorm';
import TypeOrmOptions from './typeorm.config';

@Module({
  imports: [TypeORM.forRoot(TypeOrmOptions)],
})
export class TypeOrmModule {}
