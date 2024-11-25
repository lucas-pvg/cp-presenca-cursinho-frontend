import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./redux"
import { selectLessons } from "../../features/lessons/LessonsSlice"
import { updateLessonFilters, resetLessonFilters } from "../../features/lessons/LessonsSlice"
import { LessonCreateData, LessonFilters, Lesson } from "../../data/models/lesson.model"

import { 
  createLessonService,
  listLessonsService,
  retrieveLessonService,
  updateLessonService,
  deleteLessonService
} from "../../features/lessons/lessons.service"


export const useLessons = () => {
  const dispatch = useAppDispatch()
  const lessons = useAppSelector(selectLessons)
  const { filters, loading } = useAppSelector(state => state.lessons)

  useEffect(() => {
    lessons.length === 0 && dispatch(listLessonsService())
  }, [dispatch])

  const create = useCallback((lessonData: LessonCreateData) => {
    dispatch(createLessonService(lessonData))
  }, [dispatch])

  const list = useCallback(() => {
    dispatch(listLessonsService())
  }, [dispatch])

  const retrieve = useCallback((lessonId: number) => {
    const [lesson, setLesson] = useState<Lesson>()

    const handleRetrieve = async () => {
      let lesson = lessons.find((lesson) => lesson.id === lessonId)

      if (!lesson) {
        const resultAction = await dispatch(retrieveLessonService(lessonId))
        if (retrieveLessonService.fulfilled.match(resultAction)) {
          lesson = resultAction.payload
        } else {
          console.error("Failed to retrieve lesson", resultAction.payload)
          lesson = undefined
        }
      }

      setLesson(lesson)
    }
    
    useEffect(() => {
      handleRetrieve()
    }, [lessonId])

    return lesson
  }, [dispatch])

  const update = useCallback((lessonId: number, lesson: LessonCreateData) => {
    dispatch(updateLessonService({ lessonId, lesson }))
  }, [dispatch])

  const destroy = useCallback((lessonId: number) => {
    dispatch(deleteLessonService(lessonId))
  }, [dispatch])

  const updateFilters = useCallback((filters: Partial<LessonFilters>) => {
    dispatch(updateLessonFilters(filters))
  }, [dispatch])

  const resetFilters = useCallback(() => {
    dispatch(resetLessonFilters())
  }, [dispatch])

  return { 
    lessons,
    filters,
    loading,
    create,
    list,
    retrieve,
    update,
    destroy,
    updateFilters, 
    resetFilters 
  }
}
