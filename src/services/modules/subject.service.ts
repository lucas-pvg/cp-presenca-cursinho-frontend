import { get } from "../axios"
import { subjectMapper } from "../../data/mapper";
import { SubjectServiceResponse } from "../../data/models/subject.model";

const SubjectService = {
  async listSubjects(params?: unknown) {
    const response = await get('subject/', { params })
    const subjectMapped = response.map((subject: SubjectServiceResponse) => 
      subjectMapper(subject)
    )

    return subjectMapped
  },

  async retrieveSubject(subjectId: number) {
    const response = await get(`subject/${subjectId}/`)
    return subjectMapper(response)
  }
}

export default SubjectService
