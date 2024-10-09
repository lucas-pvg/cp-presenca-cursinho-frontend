import { get, post, patch, destroy } from '../axios';
import { studentClassMapper } from '../../data/mapper';
import { StudentClassRequest, StudentClassResponse } from '../../data/models/student-class.model';

const StudentClassService = {
  async listStudentClasses(params?: unknown) {
    const response = await get('student_class/', { params });
    const studentClassMapped = response.map(
      (studentClass: StudentClassResponse) => studentClassMapper(studentClass)
    );

    return studentClassMapped;
  },

  async retrieveStudentClass(studentClassId: number) {
    const response = await get(`student_class/${studentClassId}/`);
    return studentClassMapper(response);
  },

  async createStudentClass(studentClass: StudentClassRequest, params?: unknown) {
    return await post('student_class/', studentClass, params);
  },

  async updateStudentClass(studentClassId: number, studentClass: StudentClassRequest, params?: unknown) {
    return await patch(`student_class/${studentClassId}/`, studentClass, params);
  },

  async deleteStudentClass(studentClassId: number) {
    return await destroy(`student_class/${studentClassId}/`);
  }

};

export default StudentClassService;
