import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
    return this.users[this.users.length - 1];
  }

  findAll(): User[] {
    return this.users;
  }
}
