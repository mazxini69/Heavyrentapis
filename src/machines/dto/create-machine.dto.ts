import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({ example: 'Compactadora Caterpillar CS11 GC', description: 'Nombre de la máquina' })
  name: string;

  @ApiProperty({ example: 'Compactadora', description: 'Tipo de máquina' })
  type: string;

  @ApiProperty({ example: 'Caterpillar', description: 'Marca de la máquina' })
  brand: string;

  @ApiProperty({ example: 175, description: 'Tarifa diaria de alquiler de la máquina' })
  dailyRate: number;

  @ApiProperty({ example: 'disponible', description: 'Estado actual de la máquina', required: false, default: 'disponible' })
  status?: string;
}
