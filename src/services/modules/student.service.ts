import { get } from "../axios"
import { StudentResponse } from "../../data/models/student.model";
import { studentMapper } from "../../data/mapper";

const StudentService = {
  async listStudent(params?: unknown) {
    const response = await get('student/', { params });
    const studentMapped = response.map((student: StudentResponse) => 
      studentMapper(student)
    );

    return studentMapped;
  },
}

export default StudentService
