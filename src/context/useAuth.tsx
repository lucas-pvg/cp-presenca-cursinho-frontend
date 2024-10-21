import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React from 'react';
import axios from 'axios';
import { User } from '../data/models/user.model';
import Services from '../services';

type UserContextType = {
  user: User | null;
  token: { access: string; refresh: string };
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState({ access: '', refresh: '' });
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    if (accessToken && refreshToken) {
      Services.retrieveSelfUser()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });

      setToken({ access: accessToken, refresh: refreshToken });
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const response = await Services.login({ email, password });
      if (response) {
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        setToken({
          access: response.access,
          refresh: response.refresh,
        });
        toast.success('Login realizado com sucesso');
        navigate('/');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao realizar o login');
    }
  };

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    return !!accessToken && !!refreshToken;
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    setToken({ access: '', refresh: '' });
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
