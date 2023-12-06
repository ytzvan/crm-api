import { Module } from '@nestjs/common';
import { Users } from './users';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [Users, UsersService],
})
export class UsersModule {}
