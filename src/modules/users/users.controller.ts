import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSuperAdminDto } from './dto/create-superAdmin.dto';
 
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<User | { message: string; code: string }> {
    return this.usersService.findOne(id);
  }

  @Post('new')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | { message: string; code: string }> {
    return this.usersService.create(createUserDto);
  }

  @Post('new-superadmin')
  async createSuperAdminUser(
    @Body() createSuperAdminDto: CreateSuperAdminDto,
  ): Promise<User | { message: string; code: string }> {
    return this.usersService.createSuperAdmin(createSuperAdminDto);
  }
}
