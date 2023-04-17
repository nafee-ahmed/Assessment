import { forwardRef, Inject, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // getting called by local.strategy.ts
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      return { email: user.email, name: user.name, id: user.id };
    }
    return null;
  }

  // sending the token for sign up and login, which is then used by the frontend 
  // to authenticate themselves after consecutive requests.
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
      id: user.id,
    };
  }

  async verifyUser(user: any) {
    return { message:  user};
  }
}
