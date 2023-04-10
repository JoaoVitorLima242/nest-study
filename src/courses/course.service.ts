import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepo: Repository<Course>,
  ) {}

  findAll() {
    return this.coursesRepo.find();
  }

  async findOne(id: string) {
    const course = await this.coursesRepo.findOneBy({ id: Number(id) });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepo.create(createCourseDto);

    return this.coursesRepo.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepo.preload({
      id: Number(id),
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return this.coursesRepo.save(course);
  }

  async remove(id: string) {
    const course = await this.coursesRepo.findOneBy({
      id: Number(id),
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return this.coursesRepo.remove(course);
  }
}
