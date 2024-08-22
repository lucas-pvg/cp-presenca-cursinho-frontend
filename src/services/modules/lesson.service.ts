import { get, patch, post } from "../axios"
import { lessonMapper, lessonRequestMapper } from "../../data/mapper";
import { Lesson, LessonCreateData, LessonServiceResponse } from "../../data/models/lesson.model";

const LessonService = {
  async createLesson(lesson: LessonCreateData, params?: unknown) {
    console.log('entrou no serviço')
    return await post('lesson/', lessonRequestMapper(lesson), params);
  },

  async listLessons(params?: unknown) {
    const response = await get('lesson/', { params });
    const lessonsMapped = response.map((lesson: LessonServiceResponse) => 
      lessonMapper(lesson)
    );

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

  async listLessonsWithDetails(params?: unknown): Promise<Lesson[]> {
    const response = await get('lesson_with_details/', { params });
    const lessonsMapped = response.map((lesson: LessonServiceResponse) => 
      lessonMapper(lesson)
    );

    return lessonsMapped;
  },

  async updateLessonPasskey(passkey: string, lessonId: number, params?: unknown) {
    return await post(`lesson/${lessonId}/update_passkey`, passkey, params);
  }
};

export default LessonService;
