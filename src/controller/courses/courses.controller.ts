import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
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
}
