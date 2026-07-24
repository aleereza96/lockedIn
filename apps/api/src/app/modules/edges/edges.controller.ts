import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';

@Controller('edges')
export class EdgesController {
  constructor(private readonly edgesService: EdgesService) {}

  @Post()
  create(@Body() createEdgeDto: CreateEdgeDto) {
    return this.edgesService.create(createEdgeDto);
  }

  @Get()
  findAll() {
    return this.edgesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.edgesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEdgeDto: UpdateEdgeDto) {
    return this.edgesService.update(+id, updateEdgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.edgesService.remove(+id);
  }
}
