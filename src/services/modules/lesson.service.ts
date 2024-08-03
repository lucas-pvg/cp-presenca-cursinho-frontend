import { get, patch } from "../axios"
import { lessonMapper } from "../../data/mapper";
import { LessonServiceResponse } from "../../data/service-responses";

const LessonService = {
  async listLessons(params?: unknown) {
    const response = await get('lesson/', { params });
    const lessonsMapped = response.map((lesson: LessonServiceResponse) => {
      lessonMapper(lesson);
    });

    return lessonsMapped;
  },

  async updateAttendanceRegistrability(lessonId: number, params?: unknown) {
    const response = await patch(`lesson/${lessonId}/update_attendance_registrability/`, {}, { params });
    return lessonMapper(response);
  },

  async retrieveLesson(lessonId: number) {
    const response = await get(`lesson/${lessonId}/`);
    return lessonMapper(response); 
  },

  async listLessonsWithDetails(params?: unknown) {
    const response = await get('lesson_with_details/', { params });
    const lessonsMapped = response.map((lesson: LessonServiceResponse) => {
      lessonMapper(lesson);
    });

    return lessonsMapped;
  }
};

export default LessonService;