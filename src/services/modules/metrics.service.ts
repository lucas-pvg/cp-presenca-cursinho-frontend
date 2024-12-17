import { get } from '../axios';

const MetricsService = {
  async getStudentsTotalAttendance(params?: unknown) {
    const response = await get('metrics/students-total-attendance/', { params });
    return response;
  },

  async getLessonsAttendancePercentage(params?: unknown) {
    const response = await get('metrics/lessons_attendance_percentage/', { params });
    return response;
  },

  async getSubjectsAvgAttendancePercentage(params?: unknown) {
    const response = await get('metrics/subjects_avg_attendance_percentage/', { params });
    return response;
  },

  async getStudentClassesAvgAttendancePercentage(params?: unknown) {
    const response = await get('metrics/student_classes_avg_attendance_percentage/', { params });
    return response;
  },

  async getAttendanceHistory(params?: unknown) {
    const response = await get('metrics/attendance_history/', { params });
    return response;
  },
};

export default MetricsService;
