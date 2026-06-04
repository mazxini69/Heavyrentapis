import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateRentalDto } from './dto/create-rental.dto';

@ApiTags('Alquileres (Rentals)')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Registrar una nueva solicitud de alquiler' })
  @ApiResponse({ status: 201, description: 'La solicitud de alquiler ha sido registrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token inválido o faltante.' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRentalDto: CreateRentalDto, @Req() req: any) {
    return this.rentalsService.create(createRentalDto, req.user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obtener todas las solicitudes de alquiler de mi usuario' })
  @ApiResponse({ status: 200, description: 'Lista de alquileres del usuario.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: any) {
    return this.rentalsService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Obtener detalles de un alquiler específico por ID' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud de alquiler' })
  @ApiResponse({ status: 200, description: 'Detalles del alquiler.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una solicitud de alquiler por ID' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud de alquiler' })
  @ApiResponse({ status: 200, description: 'Alquiler actualizado exitosamente.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: any) {
    return this.rentalsService.update(+id, updateRentalDto);
  }

  @ApiOperation({ summary: 'Eliminar/Cancelar una solicitud de alquiler por ID' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud de alquiler' })
  @ApiResponse({ status: 200, description: 'Alquiler eliminado/cancelado exitosamente.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalsService.remove(+id);
  }
}
