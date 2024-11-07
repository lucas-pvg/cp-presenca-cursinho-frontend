import { studentClassMapper } from '../../data/mapper/studentclass.mapper';
import { StudentClassResponse } from '../../data/models/student-class.model';
import { get } from '../axios';

export const StudentClassService = {
  async listStudentClasses(params?: unknown) {
    const response = await get('student-class/', { params });
    return response.map((studentClass: StudentClassResponse) =>
      studentClassMapper(studentClass)
    );
  },

  async retrieveStudentClass(studentClassId: number) {
    const response = await get(`student-class/${studentClassId}`);
    return studentClassMapper(response);
  },
};
