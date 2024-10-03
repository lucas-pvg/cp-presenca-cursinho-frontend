import { Subject, SubjectCreateData } from "../models/subject.model"
import { SubjectServiceResponse, SubjectServiceRequest } from "../models/subject.model"

export const subjectMapper = (subject: SubjectServiceResponse): Subject =>
  new Subject ({
    id: subject.id,
    name: subject.name,
    mainSubject: subject.main_subject
})

export const subjectRequestMapper = (subject: SubjectCreateData): SubjectServiceRequest => {
  return {
    name: subject.name,
    main_subject: subject.mainSubject
  }
}
