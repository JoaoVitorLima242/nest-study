import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from 'src/services/course/course.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CourseService) {}

  @Get()
  findAll(@Res() res: Response) {
    return res.status(200).send('list');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `curso #${id}`;
  }

  @Post('create')
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `Atuslização curso #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Deletando curso #${id}`;
  }
}
