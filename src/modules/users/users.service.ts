import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateSuperAdminDto } from './dto/create-superAdmin.dto';
import { Company } from '../companies/companies.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
    private datasource: DataSource,
  ) {}
  /*create(user: UserInterface) {
    this.users.push(user);
    return this.users[this.users.length - 1];
  }*/

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  getShortUuidByEmail(shortUuid: string): Promise<User[]> {
    return this.userRepo.find({
      where: {
        shortUuid: shortUuid,
      },
    });
  }

  findOne(id: number): Promise<User | { message: string; code: string }> {
    return this.userRepo.findOneBy({ id });
  }
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email: email });
  }

  async findUserByShortUuid(shortUuid: string): Promise<User> {
    return await this.userRepo.findOneBy({ shortUuid: shortUuid });
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
    const uuid = uuidv4();
    Object.assign(user, createUserDto); // copy defaults
    user.email = createUserDto.email.toLowerCase();
    user.password = hashPassword;
    user.passwordSalt = salt;
    user.uuid = uuid;
    const shortUuid = user.uuid.substring(user.uuid.length - 10);
    user.shortUuid = shortUuid.toUpperCase();
    try {
      const shortUuidExist = await this.findUserByShortUuid(user.shortUuid);
      console.log('shortUuid', shortUuid);
      if (shortUuidExist) {
        // generate a new one an try agaiun
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'shortUuidExist already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
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
      console.log("Error: ", e );
      throw new Error(e);
    }
  }


  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto) {
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
    const password = createSuperAdminDto.password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User();
    const company = new Company();
    const uuid = uuidv4();
    Object.assign(user, createSuperAdminDto); // copy defaults
    user.email = createSuperAdminDto.email.toLowerCase();
    user.password = hashPassword;
    user.passwordSalt = salt;
    user.uuid = uuid;
    const shortUuid = user.uuid.substring(user.uuid.length - 10);
    user.shortUuid = shortUuid.toUpperCase();
    company.name = createSuperAdminDto.companyName;
    try {
      const shortUuidExist = await this.findUserByShortUuid(user.shortUuid);
      console.log('shortUuid', shortUuid);
      if (shortUuidExist) {
        // generate a new one an try agaiun
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'shortUuidExist already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      console.log("company", company);
      const saveCompany = await this.companyRepo.save(company);
      console.log("company", saveCompany);
      if (saveCompany) {
        user.company = saveCompany;
      }
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
      console.log("Error: ", e );
      throw new Error(e);
    }
  }
}
