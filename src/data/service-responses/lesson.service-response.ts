export interface LessonServiceResponse {
  id: number,
  subject: string,
  start_datetime: string,
  end_datetime: string,
  attendance_start_datetime: string,
  attendance_end_datetime: string,
  is_attendance_registrable: boolean,
  student_class: string,
  course: string
}