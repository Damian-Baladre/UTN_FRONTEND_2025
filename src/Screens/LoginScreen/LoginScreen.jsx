import React, { useState } from 'react';
import './LoginScreen.css';
import LOCALSTORAGE_KEYS from '../../constantas/localstorage.js';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authServices.js';
import useForm from '../../hooks/useForm.jsx';
import { LOGIN_FIELD_NAMES } from '../../constantas/form/login.js';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const LoginScreen = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordVisible , setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const handlePassworsVisibility = e => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible)
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            const server_response_data = await login({
                email: form_state[LOGIN_FIELD_NAMES.EMAIL],
                password: form_state[LOGIN_FIELD_NAMES.PASSWORD]
            });
            if (server_response_data && server_response_data.status === 200) {
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    server_response_data.data.authorization_token
                );
                navigate('/home');
            } else {
                setError(server_response_data.message || 'Error desconocido');
            }
        } catch (error) {
            setError('Ocurrió un error al comunicarnos con el servidor (inténtalo de nuevo más tarde)');
        } finally {
            setLoading(false);
        }
    };

    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit,
        initial_form_state: {
            [LOGIN_FIELD_NAMES.EMAIL]: '',
            [LOGIN_FIELD_NAMES.PASSWORD]: ''
        }
    });

    return (
        <div className='contenedor-login'>
            <img src="/logoSlack.png" alt="Logo Slack" className="logo-slack" />
            <h1 className='titulo-login'>Escribe tu correo electrónico para conectarte</h1>
            <p className='subtitulo-login'>O selecciona otra opción</p>
            <form className='formulario-login' onSubmit={handleSubmit}>
                <div className='contenedor-input'>
                    <label htmlFor="email">Ingresa tu email:</label>
                    <input
                        id='email'
                        name={LOGIN_FIELD_NAMES.EMAIL}
                        placeholder='nombre@works-email.com'
                        type='email'
                        value={form_state[LOGIN_FIELD_NAMES.EMAIL]}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-password'>
                    <label htmlFor="password">Ingresa tu contraseña:</label>
                    <div className='password-box'>
                    <input
                        id='password'
                        name={LOGIN_FIELD_NAMES.PASSWORD}
                        type={passwordVisible ? "text" : "password"} 
                        value={form_state[LOGIN_FIELD_NAMES.PASSWORD]}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={handlePassworsVisibility}>
                        {passwordVisible ? <HiEye /> : <HiEyeOff />}
                    </button>
                    </div>
                </div>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {
                    loading
                        ? <button type='button' disabled={loading}>Cargando</button>
                        : <button type='submit'>Continuar</button>
                }
            </form>
            <footer className='footer-login'>
                <ul>
                    <li>
                        <a href='#'>Privacidad y términos</a>
                    </li>
                    <li>
                        <a href='#'>Contáctanos</a>
                    </li>
                    <li>
                        <a href='#'>Cambiar la región</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default LoginScreen;
