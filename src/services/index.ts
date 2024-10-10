import LessonService from './modules/lesson.service';
import SubjectService from './modules/subject.service';
import RecurrencyService from './modules/recurrency.service';
import StudentService from './modules/student.service';
import StudentClassService from './modules/student-class.service';
import LoginService from './modules/login.service';

const Services = {
  ...LessonService,
  ...SubjectService,
  ...RecurrencyService,
  ...StudentService,
  ...StudentClassService,
  ...LoginService,
};

export default Services;
