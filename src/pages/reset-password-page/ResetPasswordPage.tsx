import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';

import './ResetPasswordPage.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Services from '../../services';
import { Oval } from 'react-loader-spinner';

export function ResetPasswordPage() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [resetPasswordData, setResetPasswordData] = useState({
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      resetPasswordData.password !== resetPasswordData.password_confirmation
    ) {
      toast.error('As senhas não coincidem.');
      return;
    }

    if (!token) {
      toast.error('Token inválido.');
      return;
    }

    Services.resetPassword({ password: resetPasswordData.password, token })
      .then(() => {
        toast.success(
          'Senha redefinida com sucesso! \nVocê será redirecionado para a página de login.'
        );
        setIsLoading(false);
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      })
      .catch(() => {});
  };

  return (
    <>
      <form id="reset-password-form" onSubmit={handleSubmit}>
        <h1>Redefinir senha</h1>
        <Input
          required
          type="password"
          placeholder="Senha"
          value={resetPasswordData?.password}
          onChange={(e) =>
            setResetPasswordData({
              ...resetPasswordData,
              password: e.target.value,
            })
          }
        />
        <Input
          required
          type="password"
          placeholder="Confirmação de senha"
          value={resetPasswordData?.password_confirmation}
          onChange={(e) =>
            setResetPasswordData({
              ...resetPasswordData,
              password_confirmation: e.target.value,
            })
          }
        />
        <Button
          type="submit"
          form="reset-password-form"
          variant="solid"
          mode="light"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          {isLoading ? (
            <Oval
              color="var(--blue-inverse)"
              secondaryColor="#FFFFFF"
              height={20}
              width={20}
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          ) : (
            'Redefinir senha'
          )}
        </Button>
      </form>
    </>
  );
}
