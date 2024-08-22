import { Lesson, LessonCreateData } from "../models/lesson.model";
import { LessonServiceResponse, LessonServiceRequest } from "../models/lesson.model";


export const lessonMapper = (lesson: LessonServiceResponse): Lesson => 
  new Lesson ({
    id: lesson.id,
    name: lesson.name || "",
    subject: lesson.subject,
    startTime: new Date(lesson.start_datetime),
    endTime: new Date(lesson.end_datetime),
    startAttendance: new Date(lesson.attendance_start_datetime),
    endAttendance: new Date(lesson.attendance_end_datetime),
    isAttendanceRegistrable: lesson.is_attendance_registrable,
    studentClass: lesson.student_class,
    course: lesson.course,
    passkey: lesson.passkey
});


export const lessonRequestMapper = (lesson: LessonCreateData): LessonServiceRequest => {
  let startDatetime: Date = new Date(`${lesson.date}T${lesson.startTime}`)
  let endDatetime: Date = new Date(`${lesson.date}T${lesson.endTime}`)

  return {
    name: lesson.name,
    subject: lesson.subject,
    student_class: lesson.studentClass,
    start_datetime: startDatetime,
    end_datetime: endDatetime,
    attendance_start_datetime: startDatetime,
    attendance_end_datetime: endDatetime,
    is_attendance_registrable: false,
    passkey: 'CURSINHO',
}};
