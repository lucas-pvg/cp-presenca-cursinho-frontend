export interface StudentClassInterface {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
}

export interface StudentClassResponse {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
}

export interface StudentClassRequest {
  id?: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];
}

export class StudentClass implements StudentClassInterface {
  id: number;
  name: string;
  classroom: string;
  course?: string;
  modality: string;
  subjects: number[];

  constructor(params: StudentClassInterface) {
    this.id = params.id
    this.name = params.name
    this.classroom = params.classroom
    this.course = params.course
    this.modality = params.modality
    this.subjects = params.subjects
  }

  modalityFormat(): string {
    switch (this.modality) {
      case 'ON':
        return 'Online';
      case 'IN':
        return 'Presencial';
      default:
        return 'Modalidade não listada'
    }
  }

  toDict(): StudentClassInterface {
    return ({
      id: this.id,
      name: this.name,
      classroom: this.classroom,
      course: this.course,
      modality: this.modality,
      subjects: this.subjects
    })
  }
}
