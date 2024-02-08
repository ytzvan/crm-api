import { Module } from '@nestjs/common';
import { Users } from './users';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './users.subscriber';
import { Company } from '../companies/companies.entity';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  controllers: [UsersController],
  providers: [
    Users,
    UsersService,
    UserSubscriber,
    Company,
    CompaniesModule,
    {
      provide: getRepositoryToken(User),
      useValue: {}, // for testing
    },
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
