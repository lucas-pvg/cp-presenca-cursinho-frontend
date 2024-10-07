import { LessonRecurrencyInterface, LessonRecurrencyResponse, LessonRecurrentDatetimeRequest } from "../models/recurrency.model"
import { LessonRecurrentDatetime, LessonRecurrentDatetimeResponse } from "../models/recurrency.model"

export const recurrencyMapper = (recurrency: LessonRecurrencyResponse): LessonRecurrencyInterface => {
  return ({
    id: recurrency.id,
    studentClass: recurrency.student_class,
    subject: recurrency.subject,
    lessonDatetimes: recurrency.lesson_datetimes?.map(datetime => recurrentDatetimeMapper(datetime))
  })
}

export const recurrentDatetimeMapper = (datetime: LessonRecurrentDatetimeResponse): LessonRecurrentDatetime => { 
  return new LessonRecurrentDatetime({
    id: datetime.id,
    lessonRecurrency: datetime.lesson_recurrency,
    startDatetime: new Date(datetime.start_datetime),
    endDatetime: new Date(datetime.end_datetime),
    dayOfWeek: datetime.day_of_week
  })
}

export const recurrentDatetimeRequestMapper = (datetime: LessonRecurrentDatetime): LessonRecurrentDatetimeRequest => {
  return {
    lesson_recurrency: datetime.lessonRecurrency,
    start_datetime: datetime.startDatetime,
    end_datetime: datetime.endDatetime,
    day_of_week: datetime.dayOfWeek,
  }
}
