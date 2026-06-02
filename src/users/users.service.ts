import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreateGoogleUser(googleUser: any): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { googleId: googleUser.googleId },
    });

    if (!user) {
      // Fallback search by email
      user = await this.userRepository.findOne({
        where: { email: googleUser.email },
      });

      if (!user) {
        // Save user if logging in for the first time
        user = this.userRepository.create({
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
        });
        await this.userRepository.save(user);
      } else {
        // Link googleId to existing email account
        user.googleId = googleUser.googleId;
        if (!user.picture && googleUser.picture) {
          user.picture = googleUser.picture;
        }
        await this.userRepository.save(user);
      }
    }

    return user;
  }
}
