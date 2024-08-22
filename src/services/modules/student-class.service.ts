import { get } from "../axios"
import { studentClassMapper } from "../../data/mapper"
import { StudentClassResponse } from "../../data/models/student-class.model"

const StudentClassService = {
  async listStudentClasses(params?: unknown) {
    const response = await get('student_class/', { params })
    const studentClassMapped = response.map((studentClass: StudentClassResponse) => 
      studentClassMapper(studentClass)
    )

    return studentClassMapped
  },

  async retrieveStudentClass(studentClassId: number) {
    const response = await get(`subject/${studentClassId}/`)
    return studentClassMapper(response)
  }
}

export default StudentClassService
