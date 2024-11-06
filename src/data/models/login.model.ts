export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface RefreshTokenData {
  refresh: string;
}

export interface ResetPasswordData {
  password: string;
  token: string;
}
