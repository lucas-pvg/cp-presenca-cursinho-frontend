import { get, patch, post } from "../axios"

const LessonService = {
  async listLessons(params?: any) {
    return await get('lesson/', { params });
  },

  async updateAttendanceRegistrability(lessonId: number, params?: any) {
    return await patch(`lesson/${lessonId}/update_attendance_registrability/`, {}, { params })
  },

  async retrieveLesson(lessonId: number) {
    return await get(`lesson/${lessonId}/`)
  },

  async listLessonsWithDetails(params?: any) {
    return await get('lesson_with_details/', { params });
  },

  async setPassKey(passkey: string, lessonId: number, params?: any) {
    return await post(`lesson/${lessonId}/update_passkey`, passkey, params)
  }
};

export default LessonService;