import { useState } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';

import './ForgotPasswordPage.css';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar o e-mail de recuperação de senha
        console.log('E-mail enviado para:', email);
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
            <Link className="back-to-login" to="/">
                Login
            </Link>
        </>
    );
}