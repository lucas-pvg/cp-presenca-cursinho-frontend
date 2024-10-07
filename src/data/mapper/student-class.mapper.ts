import { StudentClass } from '../models/student-class.model';
import { StudentClassResponse } from '../models/student-class.model';

export const studentClassMapper = (
  studentClass: StudentClassResponse
): StudentClass => new StudentClass(studentClass);
