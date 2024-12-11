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
};

export default MetricsService;
