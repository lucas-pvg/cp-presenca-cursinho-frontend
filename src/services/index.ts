import LessonService from './modules/lesson.service';
import SubjectService from './modules/subject.service';
import StudentService from './modules/student.service';
import StudentClassService from './modules/student-class.service';

const Services = {
  ...LessonService,
  ...SubjectService,
  ...StudentService,
  ...StudentClassService,
};

export default Services;
