import { Module } from '@nestjs/common';
import { Users } from './users';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './users.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    Users,
    UsersService,
    UserSubscriber,
    {
      provide: getRepositoryToken(User),
      useValue: {}, // for testing
    },
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
