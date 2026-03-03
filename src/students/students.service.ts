import { Injectable, BadRequestException } from '@nestjs/common';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    { id: '1', firstName: 'John', course: 'BSIT', year: '3', section: 'A', isPresent: false },
    { id: '2', firstName: 'Maria', course: 'BSCS', year: '2', section: 'B', isPresent: false },
  ];

  findAll(): Student[] {
    return this.students;
  }

  markPresent(id: string): Student {
    const student = this.students.find((s) => s.id === id);
    if (!student) throw new BadRequestException('Student not found');
    student.isPresent = true;
    return student;
  }
}
