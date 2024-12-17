import { StudentClassResponse } from './student-class.model';
import { UserBasicInfoServiceResponse } from './user.model';

export interface StudentInterface {
  id: number;
  fullName: string;
  email: string;
  studentClass: {
    id: number;
    name: string;
    classroom: string;
    course?: string;
    modality: string;
    subjects: number[];
    startDatetime?: Date;
    endDatetime?: Date;
  };
}

export interface StudentResponse {
  id: number;
  student_class: StudentClassResponse;
  user: UserBasicInfoServiceResponse;
}

export interface StudentWithAttendanceResponse extends StudentResponse {
  attendance: string;
}

export interface StudentWithAttendanceInterface extends StudentInterface {
  attendance: string;
}

export interface StudentSelect {
  name: string;
  id: number;
}

export interface StudentFilters {
  name: string
  student_class: string
  lesson_id: string
}
