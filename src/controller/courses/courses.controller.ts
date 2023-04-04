import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return 'listagem de cursos';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `curso #${id}`;
  }

  @Post('create')
  @HttpCode(204)
  create(@Body() body) {
    return body;
  }
}
