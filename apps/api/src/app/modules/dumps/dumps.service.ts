import { Injectable } from '@nestjs/common';
import { CreateDumpDto } from './dto/create-dump.dto';
import { UpdateDumpDto } from './dto/update-dump.dto';

@Injectable()
export class DumpsService {
  create(createDumpDto: CreateDumpDto) {
    return 'This action adds a new dump';
  }

  findAll() {
    return `This action returns all dumps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dump`;
  }

  update(id: number, updateDumpDto: UpdateDumpDto) {
    return `This action updates a #${id} dump`;
  }

  remove(id: number) {
    return `This action removes a #${id} dump`;
  }
}
