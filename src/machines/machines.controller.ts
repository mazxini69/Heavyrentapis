import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles/roles.guard';
import { Roles } from '../common/roles/roles.decorator';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createMachineDto: any) {
    return this.machinesService.create(createMachineDto);
  }
}
