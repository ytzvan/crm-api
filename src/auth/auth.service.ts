import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userCode: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByShortUuid(userCode);

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      console.log('Wrong password');
      throw new UnauthorizedException('Wrong password'); // change password doesn't not match
    }

    const payload = { sub: user.id, username: user.shortUuid };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
