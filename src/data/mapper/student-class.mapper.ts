import { StudentClass } from '../models/student-class.model';
import { StudentClassResponse } from '../models/student-class.model';

export const studentClassMapper = (
  studentClass: StudentClassResponse
): StudentClass => {
  return {
    id: studentClass.id,
    name: studentClass.name,
    classroom: studentClass.classroom,
    course: studentClass.course,
    subjects: studentClass.subjects,
  };
};
