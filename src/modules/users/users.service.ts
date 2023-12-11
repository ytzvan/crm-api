import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  findOne(id: number): Promise<User | { message: string; code: string }> {
    return this.userRepo.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto) {
    /*const emailExists = await this.findUserByEmail(createUserDto.email);
    if (emailExists) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    } */
    const password = createUserDto.password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User();
    Object.assign(user, createUserDto); // copy defaults
    user.email = createUserDto.email.toLowerCase();
    user.password = hashPassword;
    user.passwordSalt = salt;
    try {
      const result = await this.userRepo.save(user);
      if (result) {
        return result;
      } else {
        return {
          message: 'User Not Found',
          code: '1',
        };
      }
    } catch (e) {
      throw new Error();
    }
  }
}
