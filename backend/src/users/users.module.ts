import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { LoggerService } from 'src/common/services/logger.service';

@Module({
  controllers: [],
  providers: [UsersService, UserRepository, LoggerService],
  exports: [UsersService],
})
export class UsersModule {}
