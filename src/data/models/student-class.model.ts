export interface StudentClassInterface {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
  start_datetime?: Date;
  end_datetime?: Date;
}

export interface StudentClassResponse {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
  start_datetime?: Date;
  end_datetime?: Date;
}

export interface StudentClassRequest {
  id?: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
  start_datetime?: Date;
  end_datetime?: Date;
}

export class StudentClass implements StudentClassInterface {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
  start_datetime?: Date;
  end_datetime?: Date;

  constructor(params: StudentClassInterface) {
    this.id = params.id;
    this.name = params.name;
    this.classroom = params.classroom;
    this.course = params.course;
    this.modality = params.modality;
    this.subjects = params.subjects;
    this.start_datetime = params.start_datetime;
    this.end_datetime = params.end_datetime;
  }

  modalityFormat(): string {
    switch (this.modality) {
      case 'ON':
        return 'Online';
      case 'IN':
        return 'Presencial';
      default:
        return 'Modalidade não listada';
    }
  }

  toDict(): StudentClassInterface {
    return {
      id: this.id,
      name: this.name,
      classroom: this.classroom,
      course: this.course,
      modality: this.modality,
      subjects: this.subjects,
      start_datetime: this.start_datetime,
      end_datetime: this.end_datetime,
    };
  }
}
