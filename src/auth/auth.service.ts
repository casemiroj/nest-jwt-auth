import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validadeUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await compare(password, user.password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
    }
  }

  async login(user) {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
