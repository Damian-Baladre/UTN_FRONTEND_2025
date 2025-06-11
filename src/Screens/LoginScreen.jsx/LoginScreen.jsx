import React, { useState } from 'react'
import './LoginScreen.css'
import  LOCALSTORAGE_KEYS from '../../constantas/localstorage'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authServices'
import useForm from '../../hooks/useForm'
import LOGIN_FIELD_NAMES  from '../../constantas/form/login'

const LoginScreen = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const onSubmit = async () => {
        try {
            setLoading(true)
            const server_response_data = await login({
                email: form_state[LOGIN_FIELD_NAMES.EMAIL],
                password: form_state[LOGIN_FIELD_NAMES.PASSWORD]
            })
            if (server_response_data.ok) {
                if (server_response_data === 200) {
                    localStorage.setItem(
                        LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                        server_response_data.data.authorization_token
                    )
                    navigate('/home')
                }
            } else {
                setError(server_response_data.message)
            }
        }

        catch (error) {
            setError('Ocurrio un error al comunicarnos con el servidor (intentalo de nuevo mas tarde')

        }
        finally {
            setLoading(false)
        }
    }
    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit,
        initial_form_state: { 
            [LOGIN_FIELD_NAMES.EMAIL]: '',
             [LOGIN_FIELD_NAMES.PASSWORD]: '' 
            }
    })

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">ingresa tu email:</label>
                    <input
                        id='email'
                        name={LOGIN_FIELD_NAMES.EMAIL}
                        placeholder='ejemplo@mail.com'
                        type='email'
                        value={form_state[LOGIN_FIELD_NAMES.EMAIL]}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Ingresa tu contraseña:</label>
                    <input
                        id='password'
                        name={LOGIN_FIELD_NAMES.PASSWORD}
                        type="password"
                        value={form_state[LOGIN_FIELD_NAMES.PASSWORD]}
                        onChange={handleChange}
                    />
                </div>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {
                    loading
                        ? <button type='button' disabled={loading}>Cargando</button>
                        : <button type='submit' >Inicar sesion</button>
                }

            </form>
        </div>
    )
}

export default LoginScreen