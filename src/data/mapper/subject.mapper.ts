import { Subject, SubjectInterface } from "../models/subject.model"

export const mapSubject = (data: any) => {
  let SubjectData: SubjectInterface = {
    id: data.id,
    name: data.name,
    mainSubject: data.main_subject
  }

  return new Subject(SubjectData)
}
