import { Lesson, LessonInterface } from "../models/lesson.model";

export const mapLesson = (data: any) => {
  let lessonData: LessonInterface = {
    id: data.id,
    name: data.name,
    startTime: new Date(data.start_datetime),
    endTime: new Date(data.end_datetime),
    studentClass: {name: 'Turma 1'},
    subject: {name: 'Matemática'},
    startAttendance: new Date (data.attendance_start_datetime),
    endAttendance: new Date (data.attendance_end_datetime),
    isAttendanceRegistrable: false,
    passkey: 'PASSWORD',
    course: data.course
  }

  return new Lesson(lessonData)
}
