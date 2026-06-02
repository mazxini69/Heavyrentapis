import { Injectable } from '@nestjs/common';

@Injectable()
export class RentalsService {
  create(createRentalDto: any) {
    return 'This action adds a new rental';
  }

  findAll() {
    return `This action returns all rentals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: any) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
