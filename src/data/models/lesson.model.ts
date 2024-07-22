export interface Lesson {
    id: number;
    subject: string;
    startDatetime: Date;
    endDatetime: Date;
    attendanceStartDatetime: Date;
    attendanceEndDatetime: Date;
    isAttendanceRegistrable: boolean;
    studentClass: string;
    course: string;
}

export interface LessonRecurrency {
    lessons: Lesson[];
    dateTime: Date;
}