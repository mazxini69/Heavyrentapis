import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMachineDto: any) {
    return this.machinesService.create(createMachineDto);
  }
}
