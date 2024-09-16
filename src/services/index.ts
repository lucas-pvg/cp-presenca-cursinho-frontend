import LessonService from './modules/lesson.service';
import SubjectService from './modules/subject.service';
import StudentClassService from './modules/student-class.service';

const Services = {
  ...LessonService,
  ...SubjectService,
  ...StudentClassService,
};

export default Services;
