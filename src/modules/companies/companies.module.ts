import { Module } from '@nestjs/common';
import { Company } from './companies.entity';
@Module({
  imports: [Company],
  controllers: [],
  providers: [],
})
export class CompaniesModule {}
