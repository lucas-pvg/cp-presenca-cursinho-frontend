import { post } from '../axios';
import { AttendanceRequest } from '../../data/models/attendance.model';

const AttendanceService = {
  async createAttendance(attendance: AttendanceRequest, params?: unknown) {
    return await post('attendance/', attendance, params);
  },
};

export default AttendanceService;
