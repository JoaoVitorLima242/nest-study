import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './controllers/courses/courses.controller';
import { CourseService } from './services/course/course.service';

@Module({
  imports: [],
  controllers: [AppController, CoursesController],
  providers: [AppService, CourseService],
})
export class AppModule {}
