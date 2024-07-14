import axios from "axios";

const BASE_URL = 'http://localhost:8000/lesson/'

export const getLesson = (id: number) => {
  const lesson = axios.get(`${BASE_URL}${id}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    })
    return lesson;
}