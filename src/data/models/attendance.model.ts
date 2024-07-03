import { Lesson } from "./lesson.model";

export interface Attendance {
    student: string;
    lesson: Lesson; 
    dateTime: Date;
    status: AttendanceStatus
}

export enum AttendanceStatus {
    PRESENT = 'P',
    ABSENT = 'A',
    JUSTIFIED = 'J',
}