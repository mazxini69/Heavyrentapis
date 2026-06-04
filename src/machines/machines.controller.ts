import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles/roles.guard';
import { Roles } from '../common/roles/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMachineDto } from './dto/create-machine.dto';

@ApiTags('Maquinarias (Machines)')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Crear una nueva máquina (Solo Admin)' })
  @ApiResponse({ status: 201, description: 'La máquina ha sido creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token inválido o faltante.' })
  @ApiResponse({ status: 403, description: 'Prohibido - Se requiere rol de administrador.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @ApiOperation({ summary: 'Obtener todas las máquinas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las máquinas.' })
  @Get()
  findAll() {
    return this.machinesService.findAll();
  }
}
