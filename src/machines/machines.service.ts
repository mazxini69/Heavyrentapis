import { Injectable } from '@nestjs/common';

@Injectable()
export class MachinesService {
  create(createMachineDto: any) {
    return 'This action adds a new machine';
  }
}
