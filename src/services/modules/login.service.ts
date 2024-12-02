import {
  ForgotPasswordData,
  LoginData,
  RefreshTokenData,
  ResetPasswordData,
} from '../../data/models/login.model';
import { post } from '../axios';

const LoginService = {
  async login(data: LoginData) {
    return await post('token/', data);
  },

  async refreshToken(data: RefreshTokenData) {
    return await post('token/refresh/', data);
  },

  async forgotPassword(data: ForgotPasswordData) {
    return await post('password_reset', data);
  },

  async resetPassword(data: ResetPasswordData) {
    return await post('password_reset/confirm/', data);
  },

  async logout(data: RefreshTokenData) {
    return await post('token/blacklist/', data);
  },
};

export default LoginService;
