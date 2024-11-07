import { get } from '../axios';
import {
  StudentResponse,
  StudentWithAttendanceResponse,
} from '../../data/models/student.model';
import { studentMapper, studentWithAttendanceMapper } from '../../data/mapper';

const StudentService = {
  async listStudent(params?: unknown) {
    const response = await get('student/', { params });
    const studentMapped = response.map((student: StudentResponse) =>
      studentMapper(student)
    );

    return studentMapped;
  },

  async listStudentWithAttendanceByLesson(lessonId: number, params?: unknown) {
    const response = await get(`student/lesson_attendance/${lessonId}/`, {
      params,
    });

    const studentsMapped = response.map(
      (student: StudentWithAttendanceResponse) =>
        studentWithAttendanceMapper(student)
    );

    return studentsMapped;
  },
};

export default StudentService;
