import { StudentClass } from "./class.model";
import { Subject } from "./subject.model";

export interface LessonInterface {
  id: number
  name: string
  startTime: Date
  endTime: Date
  studentClass: StudentClass
  subject: Subject
  startAttendance: Date
  endAttendance: Date
  isAttendanceRegistrable: boolean
  passkey: string
  course: string
}

export class Lesson implements LessonInterface {
  id: number
  name: string
  startTime: Date
  endTime: Date
  studentClass: StudentClass
  subject: Subject
  startAttendance: Date
  endAttendance: Date
  isAttendanceRegistrable: boolean
  passkey: string
  course: string

  constructor(params: LessonInterface) {
    this.id = params.id
    this.name = params.name
    this.startTime = params.startTime
    this.endTime = params.endTime
    this.studentClass = params.studentClass
    this.subject = params.subject
    this.startAttendance = params.startAttendance
    this.endAttendance = params.endAttendance
    this.isAttendanceRegistrable = params.isAttendanceRegistrable
    this.passkey = params.passkey
    this.course = params.course
  }

  dateFormat(style: 'medium' | 'short'): string {
    return this.startTime.toLocaleDateString('pt-br', {dateStyle: style})
  }

  startTimeFormat(): string {
    return this.startTime.toLocaleTimeString('pt-br', {timeStyle: 'short', hour12: false})
  }

  endTimeFormat(): string {
    return this.endTime.toLocaleTimeString('pt-br', {timeStyle: 'short', hour12: false})
  }

  startAttendanceFormat(): string {
    return this.startAttendance.toLocaleTimeString('pt-br', {timeStyle: 'short', hour12: false})
  }

  endAttendanceFormat(): string {
    return this.endAttendance.toLocaleTimeString('pt-br', {timeStyle: 'short', hour12: false})
  }
}
