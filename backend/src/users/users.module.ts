import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
