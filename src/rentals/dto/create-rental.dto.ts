import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 1, description: 'ID de la maquinaria a alquilar' })
  machineId: number;

  @ApiProperty({ example: '2026-06-05T00:00:00.000Z', description: 'Fecha de inicio del alquiler' })
  startDate: string;

  @ApiProperty({ example: '2026-06-12T00:00:00.000Z', description: 'Fecha de finalización del alquiler' })
  endDate: string;
}
