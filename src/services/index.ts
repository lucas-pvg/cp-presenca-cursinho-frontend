import LessonService from './modules/lesson.service';
import SubjectService from './modules/subject.service';
import RecurrencyService from './modules/recurrency.service';
import StudentService from './modules/student.service';
import StudentClassService from './modules/student-class.service';
import LoginService from './modules/login.service';
import UserService from './modules/user.service';
import AttendanceService from './modules/attendance.service';
import MetricsService from './modules/metrics.service';

const Services = {
  ...AttendanceService,
  ...LessonService,
  ...SubjectService,
  ...RecurrencyService,
  ...StudentService,
  ...StudentClassService,
  ...LoginService,
  ...UserService,
  ...MetricsService,
};

export default Services;
