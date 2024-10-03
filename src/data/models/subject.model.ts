export const MainSubject = [
	{ id: 'CA', name: 'Atualidades' },
	{ id: 'BI', name: 'Biologia' },
	{ id: 'PL', name: 'Filosofia' },
	{ id: 'PH', name: 'Física' },
	{ id: 'GE', name: 'Geografia' },
	{ id: 'HI', name: 'História' },
	{ id: 'MT', name: 'Matemática' },
	{ id: 'PT', name: 'Português' },
	{ id: 'CH', name: 'Química' },
]

export interface SubjectInterface {
	id: number,
	name: string,
	mainSubject: string
}

export interface SubjectCreateData {
  name: string,
  mainSubject: string
}

export interface SubjectServiceResponse {
  id: number,
  name: string,
  main_subject: string
}

export interface SubjectServiceRequest {
  name: string,
  main_subject: string
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
			default: return 'Disciplina não listada'
		}
	}
}
