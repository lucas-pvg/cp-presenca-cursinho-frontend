import { get, post, patch, destroy } from "../axios"
import { subjectMapper, subjectRequestMapper } from "../../data/mapper";
import { SubjectCreateData, SubjectServiceResponse } from "../../data/models/subject.model";

const SubjectService = {
  async createSubject(subject: SubjectCreateData, params?: unknown) {
    return await post('subject/', subjectRequestMapper(subject), params);
  },

  async listSubjects(params?: unknown) {
    const response = await get('subject/', { params });
    const subjectMapped = response.map((subject: SubjectServiceResponse) =>
      subjectMapper(subject)
    );

    return subjectMapped;
  },

  async retrieveSubject(subjectId: number) {
    const response = await get(`subject/${subjectId}/`);
    return subjectMapper(response);
  },

  async listSubjectsFromMain(mainSubject: string) {
    const response = await get(`subject/${mainSubject}/`);
    const subjectMapped = response.map((subject: SubjectServiceResponse) =>
      subjectMapper(subject)
    );

    return subjectMapped
  },

  async updateSubject(subjectId: number, subject: SubjectCreateData, params?: unknown) {
    return await patch(`subject/${subjectId}/`, subjectRequestMapper(subject), params);
  },

  async deleteSubject(subjectId: number) {
    return await destroy(`subject/${subjectId}/`)
  }
}

export default SubjectService;
