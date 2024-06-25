import { Class } from "./class.model";
import { Subject } from "./subject.model";

export interface Lesson {
    courseClass: Class;
    subject: Subject; 
}

export interface LessonDateTime {
    lesson: Lesson;
    dateTime: Date;
}