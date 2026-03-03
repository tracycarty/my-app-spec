import { Controller, Get, Post, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll(): Student[] {
    return this.studentsService.findAll();
  }

  @Post(':id/present')
  markPresent(@Param('id') id: string) {
    const student = this.studentsService.markPresent(id);
    return { message: 'Student marked as present', student };
  }
}
