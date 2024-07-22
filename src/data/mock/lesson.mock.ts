import { Lesson } from "../models/lesson.model";

export const lessonsMock: Array<Lesson> = [
  {
    id: 1,
    subject: "Álgebra",
    startDatetime: new Date('2024-07-22T09:00:00'),
    endDatetime: new Date('2024-07-22T10:00:00'),
    attendanceStartDatetime: new Date('2024-07-22T08:50:00'),
    attendanceEndDatetime: new Date('2024-07-22T09:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A",
    course: "Intensivo"
  },
  {
    id: 2,
    subject: "História",
    startDatetime: new Date('2024-07-23T14:00:00'),
    endDatetime: new Date('2024-07-23T15:30:00'),
    attendanceStartDatetime: new Date('2024-07-23T13:50:00'),
    attendanceEndDatetime: new Date('2024-07-23T14:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma B",
    course: "Extensivo"
  },
  {
    id: 3,
    subject: "Geografia",
    startDatetime: new Date('2024-07-24T11:00:00'),
    endDatetime: new Date('2024-07-24T12:00:00'),
    attendanceStartDatetime: new Date('2024-07-24T10:50:00'),
    attendanceEndDatetime: new Date('2024-07-24T11:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma A",
    course: "Intensivo"
  },
  {
    id: 4,
    subject: "Física",
    startDatetime: new Date('2024-07-25T16:00:00'),
    endDatetime: new Date('2024-07-25T17:00:00'),
    attendanceStartDatetime: new Date('2024-07-25T15:50:00'),
    attendanceEndDatetime: new Date('2024-07-25T16:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C",
    course: "Intensivo"
  },
  {
    id: 5,
    subject: "Química",
    startDatetime: new Date('2024-07-26T10:00:00'),
    endDatetime: new Date('2024-07-26T11:30:00'),
    attendanceStartDatetime: new Date('2024-07-26T09:50:00'),
    attendanceEndDatetime: new Date('2024-07-26T10:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma B",
    course: "Extensivo"
  },
  {
    id: 6,
    subject: "Literatura",
    startDatetime: new Date('2024-07-27T09:00:00'),
    endDatetime: new Date('2024-07-27T10:30:00'),
    attendanceStartDatetime: new Date('2024-07-27T08:50:00'),
    attendanceEndDatetime: new Date('2024-07-27T09:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A",
    course: "Intensivo"
  },
  {
    id: 7,
    subject: "Biologia",
    startDatetime: new Date('2024-07-28T13:00:00'),
    endDatetime: new Date('2024-07-28T14:30:00'),
    attendanceStartDatetime: new Date('2024-07-28T12:50:00'),
    attendanceEndDatetime: new Date('2024-07-28T13:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C",
    course: "Básico"
  },
  {
    id: 8,
    subject: "Álgebra",
    startDatetime: new Date('2024-07-29T15:00:00'),
    endDatetime: new Date('2024-07-29T16:00:00'),
    attendanceStartDatetime: new Date('2024-07-29T14:50:00'),
    attendanceEndDatetime: new Date('2024-07-29T15:10:00'),
    isAttendanceRegistrable: false,
    studentClass: "Turma B",
    course: "Básico"
  },
  {
    id: 9,
    subject: "Trigonometria",
    startDatetime: new Date('2024-07-30T10:00:00'),
    endDatetime: new Date('2024-07-30T11:30:00'),
    attendanceStartDatetime: new Date('2024-07-30T09:50:00'),
    attendanceEndDatetime: new Date('2024-07-30T10:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma A",
    course: "Extensivo"
  },
  {
    id: 10,
    subject: "Interpretação de Texto",
    startDatetime: new Date('2024-07-31T14:00:00'),
    endDatetime: new Date('2024-07-31T15:30:00'),
    attendanceStartDatetime: new Date('2024-07-31T13:50:00'),
    attendanceEndDatetime: new Date('2024-07-31T14:10:00'),
    isAttendanceRegistrable: true,
    studentClass: "Turma C",
    course: "Extensivo"
  }
];