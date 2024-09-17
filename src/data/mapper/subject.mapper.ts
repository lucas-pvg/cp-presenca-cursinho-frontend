import { Subject } from '../models/subject.model';
import { SubjectServiceResponse } from '../models/subject.model';

export const subjectMapper = (subject: SubjectServiceResponse): Subject =>
  new Subject({
    id: subject.id,
    name: subject.name,
    mainSubject: subject.main_subject,
  });
