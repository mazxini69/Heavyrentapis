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
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'User information from google',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // Helper method to generate standard JWTs for Postman testing
  async generateMockToken(role: string) {
    const isHostAdmin = role === 'admin';
    const mockUser = {
      id: isHostAdmin ? 999 : 888,
      email: isHostAdmin ? 'admin@heavyrent.com' : 'customer@heavyrent.com',
      name: isHostAdmin ? 'Admin Tester' : 'Customer Tester',
      role: isHostAdmin ? 'admin' : 'customer',
      picture: 'https://placehold.co/150',
    };

    const payload = { sub: mockUser.id, email: mockUser.email, role: mockUser.role };
    return {
      message: `Mock token generated successfully for role: ${role}`,
      user: mockUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
