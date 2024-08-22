export interface StudentClass {
  id: number
  name: string
  classroom: string
  course?: string
  subjects: number[]
}

export interface StudentClassResponse {
  id: number
  name: string
  classroom: string
  course?: string
  subjects: number[]
}
