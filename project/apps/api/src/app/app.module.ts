import { Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from './typeorm/typeorm.module';
import { RDBMSModule } from './service/database/rdms/rdbms.module';

// service
import { BoardService } from './controllers/board/board.service';

// controllers
import { BoardController } from './controllers/board/board.controller';

@Module({
  imports: [TypeOrmModule, RDBMSModule],
  providers: [BoardService],
  controllers: [BoardController],
})
export class AppModule {}
