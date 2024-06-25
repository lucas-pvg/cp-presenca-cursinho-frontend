import { Subject } from "./subject.model";

export interface Class {
    name: string;
    classroom: string;
    course?: string;
    subjects: Subject[];
}