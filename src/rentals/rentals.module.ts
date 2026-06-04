import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { AuthModule } from '../auth/auth.module';
import { Rental } from './rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    AuthModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
