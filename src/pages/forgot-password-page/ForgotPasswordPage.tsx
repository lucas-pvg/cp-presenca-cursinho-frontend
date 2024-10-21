import { useState } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';

import './ForgotPasswordPage.css';
import Services from '../../services';
import { toast } from 'react-toastify';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Services.forgotPassword({ email })
      .then(() => toast.success('Um e-mail foi enviado para você!'))
      .catch(() => toast.error('Verifique o e-mail e tente novamente.'));
  };

  return (
    <>
      <form id="forgot-password-form" onSubmit={handleFormSubmit}>
        <h2>Esqueci minha senha</h2>
        <Input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          form="forgot-password-form"
          variant="solid"
          mode="light"
          fullWidth
        >
          Redefinir senha
        </Button>
      </form>
      <Link className="back-to-login" to="/auth/login">
        Login
      </Link>
    </>
  );
}
