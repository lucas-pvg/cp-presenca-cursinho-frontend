import { Lesson } from "../models/lesson.model";
import { LessonServiceResponse } from "../service-responses";

export const lessonMapper = (lesson: LessonServiceResponse): Lesson => ({
	id: lesson.id,
	subject: lesson.subject,
	startDatetime: new Date(lesson.start_datetime),
	endDatetime: new Date(lesson.end_datetime),
	attendanceStartDatetime: new Date(lesson.attendance_start_datetime),
	attendanceEndDatetime: new Date(lesson.attendance_end_datetime),
	isAttendanceRegistrable: lesson.is_attendance_registrable,
	studentClass: lesson.student_class,
	course: lesson.course,
});
