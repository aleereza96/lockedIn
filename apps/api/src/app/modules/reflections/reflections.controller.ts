import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReflectionsService } from './reflections.service';
import { CreateReflectionDto } from './dto/create-reflection.dto';
import { UpdateReflectionDto } from './dto/update-reflection.dto';

@Controller('reflections')
export class ReflectionsController {
  constructor(private readonly reflectionsService: ReflectionsService) {}

  @Post()
  create(@Body() createReflectionDto: CreateReflectionDto) {
    return this.reflectionsService.create(createReflectionDto);
  }

  @Get()
  findAll() {
    return this.reflectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reflectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReflectionDto: UpdateReflectionDto) {
    return this.reflectionsService.update(+id, updateReflectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reflectionsService.remove(+id);
  }
}
