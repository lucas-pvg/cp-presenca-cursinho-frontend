export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

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
  role: UserRole;
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

export enum UserRole {
  ADMIN = 0,
  TEACHER = 1,
  STUDENT = 2,
  OTHERS = 3,
}

export function mapRoleToString(role: number): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrador';
    case UserRole.TEACHER:
      return 'Professor';
    case UserRole.STUDENT:
      return 'Aluno';
    default:
      return 'Outros';
  }
}
