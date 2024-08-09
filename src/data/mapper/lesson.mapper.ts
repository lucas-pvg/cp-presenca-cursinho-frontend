import { Lesson, LessonInterface } from "../models/lesson.model";
import { Subject } from "../models/subject.model";

export const mapLesson = (data: any) => {
  let lessonData: LessonInterface = {
    id: data.id,
    name: data.name,
    startTime: new Date(data.start_datetime),
    endTime: new Date(data.end_datetime),
    studentClass: {name: 'Turma 1'},
    subject: new Subject({id: 1, name: 'Matemática', mainSubject: 'MT'}),
    startAttendance: new Date (data.attendance_start_datetime),
    endAttendance: new Date (data.attendance_end_datetime),
    isAttendanceRegistrable: false,
    passkey: 'PASSWORD',
  }

  return new Lesson(lessonData)
}
