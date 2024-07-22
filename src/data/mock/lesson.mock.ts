import { Lesson } from "../models/lesson.model";

export const lessonsMock: Array<Lesson> = [
  {
    id: 1,
    name: "Matemática - Álgebra",
    lessonRecurrency: 1,
    startDatetime: new Date('2024-07-22T09:00:00'),
    endDatetime: new Date('2024-07-22T10:00:00'),
    attendanceStartDatetime: new Date('2024-07-22T08:50:00'),
    attendanceEndDatetime: new Date('2024-07-22T09:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A"
  },
  {
    id: 2,
    name: "História - Idade Média",
    lessonRecurrency: 2,
    startDatetime: new Date('2024-07-23T14:00:00'),
    endDatetime: new Date('2024-07-23T15:30:00'),
    attendanceStartDatetime: new Date('2024-07-23T13:50:00'),
    attendanceEndDatetime: new Date('2024-07-23T14:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma B"
  },
  {
    id: 3,
    name: "Geografia - Climas do Mundo",
    lessonRecurrency: 1,
    startDatetime: new Date('2024-07-24T11:00:00'),
    endDatetime: new Date('2024-07-24T12:00:00'),
    attendanceStartDatetime: new Date('2024-07-24T10:50:00'),
    attendanceEndDatetime: new Date('2024-07-24T11:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma A"
  },
  {
    id: 4,
    name: "Física - Mecânica",
    lessonRecurrency: 3,
    startDatetime: new Date('2024-07-25T16:00:00'),
    endDatetime: new Date('2024-07-25T17:00:00'),
    attendanceStartDatetime: new Date('2024-07-25T15:50:00'),
    attendanceEndDatetime: new Date('2024-07-25T16:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C"
  },
  {
    id: 5,
    name: "Química - Tabela Periódica",
    lessonRecurrency: 2,
    startDatetime: new Date('2024-07-26T10:00:00'),
    endDatetime: new Date('2024-07-26T11:30:00'),
    attendanceStartDatetime: new Date('2024-07-26T09:50:00'),
    attendanceEndDatetime: new Date('2024-07-26T10:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma B"
  },
  {
    id: 6,
    name: "Literatura - Modernismo",
    lessonRecurrency: 1,
    startDatetime: new Date('2024-07-27T09:00:00'),
    endDatetime: new Date('2024-07-27T10:30:00'),
    attendanceStartDatetime: new Date('2024-07-27T08:50:00'),
    attendanceEndDatetime: new Date('2024-07-27T09:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A"
  },
  {
    id: 7,
    name: "Biologia - Ecossistemas",
    lessonRecurrency: 2,
    startDatetime: new Date('2024-07-28T13:00:00'),
    endDatetime: new Date('2024-07-28T14:30:00'),
    attendanceStartDatetime: new Date('2024-07-28T12:50:00'),
    attendanceEndDatetime: new Date('2024-07-28T13:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C"
  },
  {
    id: 8,
    name: "Educação Física - Futebol",
    lessonRecurrency: 3,
    startDatetime: new Date('2024-07-29T15:00:00'),
    endDatetime: new Date('2024-07-29T16:00:00'),
    attendanceStartDatetime: new Date('2024-07-29T14:50:00'),
    attendanceEndDatetime: new Date('2024-07-29T15:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma B"
  },
  {
    id: 9,
    name: "Arte - Pintura",
    lessonRecurrency: 1,
    startDatetime: new Date('2024-07-30T10:00:00'),
    endDatetime: new Date('2024-07-30T11:30:00'),
    attendanceStartDatetime: new Date('2024-07-30T09:50:00'),
    attendanceEndDatetime: new Date('2024-07-30T10:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A"
  },
  {
    id: 10,
    name: "Informática - Programação",
    lessonRecurrency: 2,
    startDatetime: new Date('2024-07-31T14:00:00'),
    endDatetime: new Date('2024-07-31T15:30:00'),
    attendanceStartDatetime: new Date('2024-07-31T13:50:00'),
    attendanceEndDatetime: new Date('2024-07-31T14:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C"
  }
];