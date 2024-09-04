import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';

import "./LoginPage.css"

interface loginPageProps {
    onLogin: () => void;
}

export function LoginPage({ onLogin }: loginPageProps) {
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        onLogin();
    };

    return (
        <div className='background'>
            <form id="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <Input type="email" placeholder="E-mail" />
                <Input type="password" placeholder="Senha" />
                <Button 
                    type="submit" 
                    form="login-form" 
                    variant='solid' 
                    mode='light'
                    fullWidth
                >
                    Login
                </Button>
                
            </form>
            <Link to={'/forgot-password'}>Teste</Link>  
        </div>
    );
}