export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  dateJoined?: Date;
  isActive?: boolean;
  isStaff?: boolean;
}

export interface UserBasicInfoServiceResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
}

export interface UserServiceResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  date_joined: Date;
  is_active: boolean;
  is_staff: boolean;
}
