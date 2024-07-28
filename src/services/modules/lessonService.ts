import { get, patch } from "../axios"

const LessonService = {
  async listLessons(params?: any) {
    return get('lesson/', { params });
  },

  async updateAttendanceRegistrability(lessonId: number, params?: any) {
    return patch(`lesson/${lessonId}/update_attendance_registrability/`, {}, { params })
  },

  async retrieveLesson(lessonId: number) {
    return get(`lesson/${lessonId}/`)
  },

  async listLessonsWithDetails(params?: any) {
    return get('lesson_with_details/', { params });
  }
};

export default LessonService;