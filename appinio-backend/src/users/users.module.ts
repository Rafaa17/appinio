import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersDatasource } from './users.datasource';

@Module({
  imports: [UtilsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersDatasource],
  exports: [UsersService],
})
export class UsersModule {}
