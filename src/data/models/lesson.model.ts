export interface Lesson {
    id: number;
    name: string;
    lessonRecurrency: number;
    startDatetime: Date;
    endDatetime: Date;
    attendanceStartDatetime: Date;
    attendanceEndDatetime: Date;
    isAttendanceRegistrable: boolean;
    /* TODO: remover studentClass e atribuir pela relação de classes */
    studentClass: string;
}

export interface LessonRecurrency {
    lesson: Lesson;
    dateTime: Date;
}