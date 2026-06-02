import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async googleLogin(req: any) {
    if (!req.user) {
      return { message: 'No user from Google' };
    }

    // Save user to database if logging in for the first time
    const user = await this.usersService.findOrCreateGoogleUser(req.user);

    // Generate JWT access token
    const payload = { sub: user.id, email: user.email };
    return {
      message: 'User information from google',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
