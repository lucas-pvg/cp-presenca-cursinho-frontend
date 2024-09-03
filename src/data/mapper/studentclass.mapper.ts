import { StudentClass } from "../models/class.model"

export const studentClassMapper = (studentClass: any): StudentClass => {
  return {
    name: studentClass.name,
    classroom: studentClass.classroom,
    course: studentClass.course === 'SE' ? 'Semi-Extensivo' : 'Extensivo',
    modality: studentClass.modality === 'ON' ? 'Online' : 'Presencial',
    startDateTime: new Date(studentClass.start_datetime),
    endDateTime: new Date(studentClass.end_datetime), 
    subjects: [],
  }
}

export const formattedTime = (hours: number, minutes: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
} 
