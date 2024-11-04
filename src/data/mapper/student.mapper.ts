import {
  StudentInterface,
  StudentResponse,
  StudentWithAttendanceInterface,
  StudentWithAttendanceResponse,
} from '../models/student.model';

export const studentMapper = (student: StudentResponse): StudentInterface => {
  return {
    id: student.id,
    fullName: student.user.first_name + ' ' + student.user.last_name,
    email: student.user.email,
    studentClass: {
      id: student.student_class.id,
      name: student.student_class.name,
      classroom: student.student_class.classroom,
      course: student.student_class.course,
      modality: student.student_class.modality,
      subjects: student.student_class.subjects,
      startDatetime: student.student_class.start_datetime,
      endDatetime: student.student_class.end_datetime,
    },
  };
};

export const studentWithAttendanceMapper = (
  studentWithAttendance: StudentWithAttendanceResponse
): StudentWithAttendanceInterface => {
  return {
    id: studentWithAttendance.id,
    fullName:
      studentWithAttendance.user.first_name +
      ' ' +
      studentWithAttendance.user.last_name,
    email: studentWithAttendance.user.email,
    studentClass: {
      id: studentWithAttendance.student_class.id,
      name: studentWithAttendance.student_class.name,
      classroom: studentWithAttendance.student_class.classroom,
      course: studentWithAttendance.student_class.course,
      modality: studentWithAttendance.student_class.modality,
      subjects: studentWithAttendance.student_class.subjects,
      startDatetime: studentWithAttendance.student_class.start_datetime,
      endDatetime: studentWithAttendance.student_class.end_datetime,
    },
    attendance: studentWithAttendance.attendance,
  };
};
