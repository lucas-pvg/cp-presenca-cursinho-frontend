import { createAppAsyncThunk } from '../../app/hooks/redux'
import { get, patch, post, destroy } from '../../services/axios'
import { lessonMapper, lessonRequestMapper } from '../../data/mapper'
import { LessonCreateData, LessonServiceResponse } from '../../data/models/lesson.model'


const createLessonService = createAppAsyncThunk(
  'lessons/create',
  async (lessonData: LessonCreateData, { rejectWithValue }) => {
    try {
      const response = await post('lesson/', lessonRequestMapper(lessonData))
      return lessonMapper(response)
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Não foi possível criar a aula!')
    }
  }
)


const listLessonsService = createAppAsyncThunk(
  'lessons/list',
  async (_, { getState, rejectWithValue }) => {
    try {
      const filters = getState().lessons.filters
      const response = await get('lesson_with_details/', filters)
      const lessonsMapped = response.map((lesson: LessonServiceResponse) =>
        lessonMapper(lesson)
      )

      return lessonsMapped
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Não foi possível carregar as aulas!')
    }
  },
)


const retrieveLessonService = createAppAsyncThunk(
  'lessons/retrieve',
  async (lessonId: number, { rejectWithValue }) => {
    try {
      const response = await get(`lesson/${lessonId}/`)
      return lessonMapper(response)
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Não foi possível carregar a aula!')
    }
  },
)


const updateLessonService = createAppAsyncThunk(
  'lessons/update',
  async (
    { lessonId, lesson }: { lessonId: number, lesson: LessonCreateData },
    { rejectWithValue }
  ) => {
    try {
      const response = await patch(`lesson/${lessonId}/`, lessonRequestMapper(lesson))
      return lessonMapper(response)
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Não foi possível editar a aula!')
    }
  },
)


const deleteLessonService = createAppAsyncThunk(
  'lessons/delete',
  async (lessonId: number, { rejectWithValue }) => {
    try {
      await destroy(`lesson/${lessonId}/`)
      return lessonId
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Não foi possível excluir a aula!')
    }
  }
)


export { createLessonService, listLessonsService, retrieveLessonService, updateLessonService, deleteLessonService }


// const LessonService = {
//   async updateAttendanceRegistrability(lessonId: number, params?: unknown) {
//     const response = await patch(
//       `lesson/${lessonId}/update_attendance_registrability/`,
//       {},
//       { params }
//     );
//     return lessonMapper(response);
//   },

//   async retrieveLesson(lessonId: number) {
//     const response = await get(`lesson/${lessonId}/`);
//     return lessonMapper(response);
//   },

//   async listLessonsWithDetails(params?: unknown): Promise<Lesson[]> {
//     const response = await get('lesson_with_details/', { params });
//     const lessonsMapped = response.map((lesson: LessonServiceResponse) =>
//       lessonMapper(lesson)
//     );

//     return lessonsMapped;
//   },

//   async updateLessonPasskey(
//     passkey: string,
//     lessonId: number,
//     params?: unknown
//   ) {
//     return await post(`lesson/${lessonId}/update_passkey`, passkey, params);
//   },
// };

// export default LessonService;
