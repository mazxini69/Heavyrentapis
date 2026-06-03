import { Injectable } from '@nestjs/common';

@Injectable()
export class MachinesService {
  private machines = [
    { id: 1, name: 'Excavadora Caterpillar 320', type: 'Excavadora', brand: 'Caterpillar', status: 'disponible', dailyRate: 150 },
    { id: 2, name: 'Bulldozer John Deere 850K', type: 'Bulldozer', brand: 'John Deere', status: 'alquilado', dailyRate: 200 },
    { id: 3, name: 'Cargador Frontal Volvo L120H', type: 'Cargador', brand: 'Volvo', status: 'disponible', dailyRate: 180 },
  ];

  create(createMachineDto: any) {
    const newMachine = {
      id: this.machines.length + 1,
      ...createMachineDto,
      status: createMachineDto.status || 'disponible',
    };
    this.machines.push(newMachine);
    return {
      message: 'Machine created successfully (mock)',
      machine: newMachine,
    };
  }

  findAll() {
    return this.machines;
  }
}
