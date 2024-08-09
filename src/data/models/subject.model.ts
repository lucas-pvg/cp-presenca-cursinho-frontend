export interface SubjectInterface {
	id: number
	name: string
	mainSubject: string
}

export class Subject implements SubjectInterface {
	id: number
	name: string
	mainSubject: string

	constructor(params: SubjectInterface) {
    this.id = params.id
    this.name = params.name
    this.mainSubject = params.mainSubject
  }

  mainSubjectFormat(): string {
    switch(this.mainSubject) {
      case 'CA': return 'Atualidades'
      case 'BI': return 'Biologia'
      case 'PL': return 'Filosofia'
      case 'PH': return 'Física'
      case 'GE': return 'Geografia'
      case 'HI': return 'História'
      case 'MT': return 'Matemática'
      case 'PT': return 'Português'
      case 'CH': return 'Química'
      default: return 'Português'
    }
  }
}
