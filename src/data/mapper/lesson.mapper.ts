import { Lesson } from "../models/lesson.model";
import { LessonServiceResponse } from "../models/lesson.model";

export const lessonMapper = (lesson: LessonServiceResponse): Lesson => 
  new Lesson ({
    id: lesson.id,
    name: lesson.name || "",
    subject: {name: lesson.subject},
    startTime: new Date(lesson.start_datetime),
    endTime: new Date(lesson.end_datetime),
    startAttendance: new Date(lesson.attendance_start_datetime),
    endAttendance: new Date(lesson.attendance_end_datetime),
    isAttendanceRegistrable: lesson.is_attendance_registrable,
    studentClass: {name: lesson.student_class},
    course: lesson.course,
    passkey: lesson.passkey
});
