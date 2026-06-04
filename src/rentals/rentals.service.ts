import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async create(createRentalDto: CreateRentalDto, userId: number): Promise<Rental> {
    const rental = this.rentalRepository.create({
      ...createRentalDto,
      userId,
      status: 'pending',
    });
    return await this.rentalRepository.save(rental);
  }

  async findAll(userId: number): Promise<Rental[]> {
    return await this.rentalRepository.find({
      where: { userId },
      relations: { user: true },
    });
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: number, updateRentalDto: any): Promise<Rental> {
    const rental = await this.findOne(id);
    Object.assign(rental, updateRentalDto);
    return await this.rentalRepository.save(rental);
  }

  async remove(id: number): Promise<{ message: string }> {
    const rental = await this.findOne(id);
    await this.rentalRepository.remove(rental);
    return { message: `Rental #${id} deleted successfully` };
  }
}
