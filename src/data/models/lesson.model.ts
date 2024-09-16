export interface LessonInterface {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  studentClass: string;
  subject: string;
  startAttendance: Date;
  endAttendance: Date;
  isAttendanceRegistrable: boolean;
  passkey: string;
  course: string;
}

export interface LessonCreateData {
  name: string;
  subject: string;
  studentClass: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface LessonServiceResponse {
  id: number;
  name?: string;
  subject: string;
  start_datetime: string;
  end_datetime: string;
  attendance_start_datetime: string;
  attendance_end_datetime: string;
  is_attendance_registrable: boolean;
  student_class: string;
  course: string;
  passkey: string;
}

export interface LessonServiceRequest {
  name: string;
  subject: string;
  student_class: string;
  start_datetime: Date;
  end_datetime: Date;
  attendance_start_datetime: Date;
  attendance_end_datetime: Date;
  is_attendance_registrable: boolean;
  passkey: string;
}

export class Lesson implements LessonInterface {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  studentClass: string;
  subject: string;
  startAttendance: Date;
  endAttendance: Date;
  isAttendanceRegistrable: boolean;
  passkey: string;
  course: string;

  constructor(params: LessonInterface) {
    this.id = params.id;
    this.name = params.name;
    this.startTime = params.startTime;
    this.endTime = params.endTime;
    this.studentClass = params.studentClass;
    this.subject = params.subject;
    this.startAttendance = params.startAttendance;
    this.endAttendance = params.endAttendance;
    this.isAttendanceRegistrable = params.isAttendanceRegistrable;
    this.passkey = params.passkey;
    this.course = params.course;
  }

  dateFormat(style: 'medium' | 'short'): string {
    return this.startTime.toLocaleDateString('pt-br', { dateStyle: style });
  }

  startTimeFormat(sufix: boolean = true): string {
    return sufix
      ? this.startTime.toLocaleTimeString('pt-br', {
          timeStyle: 'short',
          hour12: true,
        })
      : this.startTime
          .toLocaleTimeString('pt-br', { timeStyle: 'short', hour12: true })
          .replace('AM', '')
          .replace('PM', '');
  }

  endTimeFormat(sufix: boolean = true): string {
    return sufix
      ? this.endTime.toLocaleTimeString('pt-br', {
          timeStyle: 'short',
          hour12: true,
        })
      : this.endTime
          .toLocaleTimeString('pt-br', { timeStyle: 'short', hour12: true })
          .replace('AM', '')
          .replace('PM', '');
  }

  startAttendanceFormat(sufix: boolean = true): string {
    return sufix
      ? this.startAttendance.toLocaleTimeString('pt-br', {
          timeStyle: 'short',
          hour12: true,
        })
      : this.startAttendance
          .toLocaleTimeString('pt-br', { timeStyle: 'short', hour12: true })
          .replace('AM', '')
          .replace('PM', '');
  }

  endAttendanceFormat(sufix: boolean = true): string {
    return sufix
      ? this.endAttendance.toLocaleTimeString('pt-br', {
          timeStyle: 'short',
          hour12: true,
        })
      : this.endAttendance
          .toLocaleTimeString('pt-br', { timeStyle: 'short', hour12: true })
          .replace('AM', '')
          .replace('PM', '');
  }
}
