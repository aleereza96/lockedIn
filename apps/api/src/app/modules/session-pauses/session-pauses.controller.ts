import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionPausesService } from './session-pauses.service';
import { CreateSessionPauseDto } from './dto/create-session-pause.dto';
import { UpdateSessionPauseDto } from './dto/update-session-pause.dto';

@Controller('session-pauses')
export class SessionPausesController {
  constructor(private readonly sessionPausesService: SessionPausesService) {}

  @Post()
  create(@Body() createSessionPauseDto: CreateSessionPauseDto) {
    return this.sessionPausesService.create(createSessionPauseDto);
  }

  @Get()
  findAll() {
    return this.sessionPausesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionPausesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionPauseDto: UpdateSessionPauseDto) {
    return this.sessionPausesService.update(+id, updateSessionPauseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionPausesService.remove(+id);
  }
}
