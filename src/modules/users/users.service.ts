import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private datasource: DataSource,
  ) {}
  /*create(user: UserInterface) {
    this.users.push(user);
    return this.users[this.users.length - 1];
  }*/

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }
}
