import { get, patch } from "../axios"

const LessonService = {
  async listLessons(params?: any) {
    return get('lesson/', { params });
  },

  async updateAttendanceRegistrability(lessonId: number, params?: any) {
    return patch(`lesson/${lessonId}/update_attendance_registrability/`, {}, { params })
  }
};

export default LessonService;