import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';

import './LoginPage.css';
import { useState } from 'react';
import { LoginData } from '../../data/models/login.model';
import { useAuth } from '../../context/useAuth';

export function LoginPage() {
  const { loginUser } = useAuth();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(loginData.email, loginData.password);
  };

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          required
          type="email"
          placeholder="E-mail"
          value={loginData?.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          value={loginData?.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <Button
          type="submit"
          form="login-form"
          variant="solid"
          mode="light"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Login
        </Button>
      </form>
      <Link className="forgot-password" to={'/forgot-password'}>
        Esqueci minha senha
      </Link>
    </>
  );
}
