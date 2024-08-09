import axios from "axios"
import { mapSubject } from "../mapper/subject.mapper"

const BASE_URL = 'http://localhost:8000/subject/'

export const getSubjects = () => {
  const subjects = axios.get(BASE_URL)
    .then(response => {
      const data = response.data.map((data: any) => mapSubject(data))
      return data
    })
    .catch(error => {
      return error
    })
  
  return subjects
}

export const getSubject = (id: number) => {
  const subject = axios.get(`${BASE_URL}${id}/`)
    .then(response => {
      return mapSubject(response.data)
    })
    .catch(error => {
      return error;
    })

  return subject;
}

export const getSubjectsFromMainSubject = (mainSubject: string) => {
  const subjects = axios.get(`${BASE_URL}${mainSubject}/`)
    .then(response => {
      const data = response.data.map((data: any) => mapSubject(data))
      return data
    })
    .catch(error => {
      return error;
    })

  return subjects;
}
