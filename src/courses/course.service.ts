import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepo: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
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

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTabByName(name)),
    );
    const course = this.coursesRepo.create({ ...createCourseDto, tags });

    return this.coursesRepo.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTabByName(name)),
      ));

    const course = await this.coursesRepo.preload({
      id: Number(id),
      ...updateCourseDto,
      tags,
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

  private async preloadTabByName(name: string): Promise<Tag> {
    const tag = await this.tagRepo.findOneBy({ name });

    if (!tag) {
      return this.tagRepo.create({ name });
    }
    return tag;
  }
}
