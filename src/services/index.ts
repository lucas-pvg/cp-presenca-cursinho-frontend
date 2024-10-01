import LessonService from './modules/lesson.service';
import SubjectService from './modules/subject.service';
import StudentClassService from './modules/student-class.service';
import LoginService from './modules/login.service';
import UserService from './modules/user.service';

const Services = {
  ...LessonService,
  ...SubjectService,
  ...StudentClassService,
  ...LoginService,
  ...UserService,
};

export default Services;
