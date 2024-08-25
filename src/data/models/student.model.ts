import { StudentClass } from "./student-class.model";

export interface Student {
    name: string;
    course_class: StudentClass;
}

export interface StudentSelect {
    name: string;
    id: number;
}