import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { startAppListening } from '../../app/hooks/redux'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

import { useToastify } from '../../services/toastify'
import { Lesson, LessonFilters } from '../../data/models/lesson.model'

import {
  createLessonService,
  listLessonsService,
  retrieveLessonService,
  updateLessonService,
  deleteLessonService
} from './lessons.service'


const toastify = useToastify()

interface LessonsState {
  data: Lesson[]
  filters: Partial<LessonFilters>
  loading: boolean
}

const initialState: LessonsState = {
  data: [],
  filters: {},
  loading: false
}


export const LessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    updateLessonFilters: (state, action: PayloadAction<Partial<LessonFilters>>) => {
      const filterData = {...state.filters, ...action.payload}
      const filters = Object.fromEntries(
        Object.entries(filterData).filter(([_, v]) => v !== '')
      )

      state.filters = filters
    },

    resetLessonFilters: (state) => {
      state.filters = {}
    },

    sortLessons: (state) => {
      state.data.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createLessonService.fulfilled, (state, { payload }) => {
        toastify('success', 'Aula criada com sucesso!')
        state.data.push(payload)
        state.loading = false
      })
 
      .addCase(listLessonsService.fulfilled, (state, { payload }) => {
        toastify('success', 'Aulas carregadas!')
        state.data = payload
        state.loading = false
      })

      .addCase(retrieveLessonService.fulfilled, (state, { payload }) => {
        toastify('success', 'Aula carregada!')
        const retrievedLesson = payload
        const lessonExists = state.data.some(lesson => lesson.id === retrievedLesson.id)
      
        if (!lessonExists) {
          state.data.push(retrievedLesson)
        } else {
          state.data = state.data.map(lesson =>
            lesson.id === retrievedLesson.id ? retrievedLesson : lesson
          )
        }
        
        state.loading = false
      })

      .addCase(updateLessonService.fulfilled, (state, { payload }) => {
        toastify('success', 'Aula editada com sucesso!')
        const retrievedLesson = payload
        const lessonExists = state.data.some(lesson => lesson.id === retrievedLesson.id)
      
        if (!lessonExists) {
          state.data.push(retrievedLesson)
        } else {
          state.data = state.data.map(lesson =>
            lesson.id === retrievedLesson.id ? retrievedLesson : lesson
          )
        }

        state.loading = false
      })

      .addCase(deleteLessonService.fulfilled, (state, { payload }) => {
        toastify('success', 'Aula excluída com sucesso!')
        state.data = state.data.filter(lesson => lesson.id != payload)
        state.loading = false
      })


    builder
      .addMatcher(
        isAnyOf(
          createLessonService.pending,
          listLessonsService.pending,
          retrieveLessonService.pending,
          updateLessonService.pending,
          deleteLessonService.pending
        ),
        (state) => { state.loading = true }
      )

      .addMatcher(
        isAnyOf(
          createLessonService.rejected,
          listLessonsService.rejected,
          retrieveLessonService.rejected,
          updateLessonService.rejected,
          deleteLessonService.rejected
        ),
        (state, { payload }) => {
          const errorMessage = payload as string
          toastify('failure', `Erro ao realizar ação: ${errorMessage}`)
          state.loading = false 
        }
      )
  },
})


startAppListening({
  matcher: isAnyOf(
    LessonsSlice.actions.updateLessonFilters,
    LessonsSlice.actions.resetLessonFilters,
  ),

  effect: async (_, listenerApi) => {
    listenerApi.dispatch(listLessonsService())
  }
})


startAppListening({
  matcher: isAnyOf(
    createLessonService.fulfilled,
    updateLessonService.fulfilled,
  ),

  effect: async (_, listenerApi) => {
    listenerApi.dispatch(LessonsSlice.actions.sortLessons())
  }
})


export const { updateLessonFilters, resetLessonFilters } = LessonsSlice.actions
export const selectLessons = (state: RootState) => state.lessons.data
export default LessonsSlice.reducer
