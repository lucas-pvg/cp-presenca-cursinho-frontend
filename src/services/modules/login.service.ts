import {
  ForgotPasswordData,
  LoginData,
  RefreshTokenData,
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
    return await post('forgot_password/', data);
  },
};

export default LoginService;
