import {
  User,
  UserBasicInfoServiceResponse,
  UserServiceResponse,
} from '../models/user.model';

export const userMapper = (user: UserServiceResponse): User => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    dateJoined: user.date_joined,
    isActive: user.is_active,
    isStaff: user.is_staff,
  };
};

export const userBasicInfoMapper = (
  user: UserBasicInfoServiceResponse
): User => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  };
};
