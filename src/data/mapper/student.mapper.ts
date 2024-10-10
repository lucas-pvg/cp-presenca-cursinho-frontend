import { StudentInterface, StudentResponse } from "../models/student.model"

export const studentMapper = (student: StudentResponse): StudentInterface => {
  return ({
    id: student.id,
    name: student.full_name,
    courseClass: student.student_class,
    isPresent: false
  })
}
