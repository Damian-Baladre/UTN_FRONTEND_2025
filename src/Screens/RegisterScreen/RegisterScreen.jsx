import React, { useState } from 'react';
import  LOCALSTORAGE_KEYS  from '../../constantas/localstorage.js';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authServices.js'
import useForm from '../../hooks/useForm.jsx';
import {REGISTER_FIELD_NAMES} from '../../constantas/form/register.js'

const RegisterScreen = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

const onSubmit = async () => {
  try {
    setLoading(true)
    const server_response_data = await register({
      name: form_state[REGISTER_FIELD_NAMES.NAME],
      email: form_state[REGISTER_FIELD_NAMES.EMAIL],
      password: form_state[REGISTER_FIELD_NAMES.PASSWORD]
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

const { form_state, handleSubmit, handleChange } = useForm({
  onSubmit,
  initial_form_state: {
    [REGISTER_FIELD_NAMES.NAME]: '',
    [REGISTER_FIELD_NAMES.EMAIL]: '',
    [REGISTER_FIELD_NAMES.PASSWORD]: '',
  }
})
return (
  <div>
    <h1>Reqgister</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Ingrese su nombre</label>
        <input
          id='name'
          name={REGISTER_FIELD_NAMES.NAME}
          type='text'
          value={form_state[REGISTER_FIELD_NAMES.NAME]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email"> ingrese su E-mail:</label>
        <input
          id='email'
          name={REGISTER_FIELD_NAMES.EMAIL}
          placeholder='ejemplo@email.com'
          type='email'
          value={form_state[REGISTER_FIELD_NAMES.EMAIL]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password"> Ing</label>
        <input
          id='password'
          name={REGISTER_FIELD_NAMES.PASSWORD}
          type='paasword'
          value={form_state[REGISTER_FIELD_NAMES.PASSWORD]}
          onChange={handleChange}
        />
      </div>
    </form>
  </div>
)
}

export default RegisterScreen