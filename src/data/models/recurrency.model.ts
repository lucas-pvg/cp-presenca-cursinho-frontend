export interface LessonRecurrencyInterface {
  id: number
  studentClass: number
  subject: number
  lessonDatetimes?: Array<LessonRecurrentDatetime>
}

export interface LessonRecurrencyResponse {
  id: number
  student_class: number
  subject: number
  lesson_datetimes?: Array<LessonRecurrentDatetimeResponse>
}

export interface LessonRecurrentDatetimeInterface {
  id: number
  lessonRecurrency: number
  startDatetime: Date
  endDatetime: Date
  dayOfWeek: number
}

export interface LessonRecurrentDatetimeResponse {
  id: number
  lesson_recurrency: number
  start_datetime: string
  end_datetime: string
  day_of_week: number
}

export interface LessonRecurrentDatetimeRequest {
  lesson_recurrency: number
  start_datetime: Date
  end_datetime: Date
  day_of_week: number
}

export class LessonRecurrentDatetime implements LessonRecurrentDatetimeInterface {
  id: number
  lessonRecurrency: number
  startDatetime: Date
  endDatetime: Date
  dayOfWeek: number

  constructor (params: LessonRecurrentDatetimeInterface) {
    this.id = params.id
    this.lessonRecurrency = params.lessonRecurrency
    this.startDatetime = params.startDatetime
    this.endDatetime = params.endDatetime
    this.dayOfWeek = params.dayOfWeek
  }

  startTimeFormat(): string {
    return this.startDatetime.toLocaleTimeString('pt-br', {timeStyle: 'short'})
  }

  endTimeFormat(): string {
    return this.endDatetime.toLocaleTimeString('pt-br', {timeStyle: 'short'})
  }

  dayOfWeekFormat(): string {
    switch(this.dayOfWeek) {
      case 0: return 'Segunda'
      case 1: return 'Terça'
      case 2: return 'Quarta'
      case 3: return 'Quinta'
      case 4: return 'Sexta'
      case 5: return 'Sábado'
      case 6: return 'Domingo'
      default: return 'Dia da semana não especificado'
    }
  }
}
