import { Subject } from './subject.model';

export interface StudentClass {
  name: string;
  classroom: string;
  course: string;
  modality: string;
  subjects: Subject[];
  startDateTime: Date;
  endDateTime: Date;
}
