import { Injectable } from '@nestjs/common';
import { CreateReflectionDto } from './dto/create-reflection.dto';
import { UpdateReflectionDto } from './dto/update-reflection.dto';

@Injectable()
export class ReflectionsService {
  create(createReflectionDto: CreateReflectionDto) {
    return 'This action adds a new reflection';
  }

  findAll() {
    return `This action returns all reflections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reflection`;
  }

  update(id: number, updateReflectionDto: UpdateReflectionDto) {
    return `This action updates a #${id} reflection`;
  }

  remove(id: number) {
    return `This action removes a #${id} reflection`;
  }
}
