import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [MachinesModule, RentalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
