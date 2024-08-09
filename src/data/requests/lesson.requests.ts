import axios from "axios"
import { mapLesson } from "../mapper/lesson.mapper"

const BASE_URL = 'http://localhost:8000/lesson/'

export const getLessons = () => {
  const lessons = axios.get(BASE_URL)
    .then(response => {
      const data = response.data.map((data: any) => mapLesson(data))
      return data
    })
    .catch(error => {
      return error
    })
  
  return lessons
}

export const getLesson = (id: number) => {
  const lesson = axios.get(`${BASE_URL}${id}/`)
    .then(response => {
      return mapLesson(response.data)
    })
    .catch(error => {
      return error;
    })

  return lesson;
}
