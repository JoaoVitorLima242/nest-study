import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Course } from 'src/courses/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS course',
      description: 'NestJS course',
      tags: ['nodejs', 'javascript', 'nestjs'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((item) => item.id === Number(id));

    if (!course) {
      throw new HttpException(`Course #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    const newCourse = {
      id: Math.random(),
      ...createCourseDto,
    };

    this.courses.push(newCourse);
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      (item) => item.id === Number(id),
    );

    this.courses[indexCourse] = updateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex(
      (item) => item.id === Number(id),
    );

    if (indexCourse < 0) {
      return;
    }

    this.courses.splice(indexCourse, 1);
  }
}
