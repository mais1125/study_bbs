import { Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from './typeorm/typeorm.module';
import { RDBMSModule } from './service/database/rdms/rdbms.module';

// service
import {
  CategoryService,
  ThreadService,
  MessageService,
} from '@services/controllers';

// controllers
import {
  CategoryController,
  ThreadController,
  MessageController,
} from '@controllers';

const services = [CategoryService, ThreadService, MessageService];
const controllers = [CategoryController, ThreadController, MessageController];
@Module({
  imports: [TypeOrmModule, RDBMSModule],
  providers: [...services],
  controllers: [...controllers],
})
export class AppModule {}
