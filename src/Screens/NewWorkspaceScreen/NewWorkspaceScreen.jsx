import React, { useEffect } from 'react';
import './NewWorkspaceScreen.css'
import useForm from '../../hooks/useForm';
import useCustomQuery from '../../hooks/useCustomQuery';
import { createWorkspace } from '../../services/workspacesService';
import {Link, useNavigate } from 'react-router-dom';
import {HiArrowLeft} from 'react-icons/hi'

const NewWorkspaceScreen = () => {
    const navigate = useNavigate();
    const { response, loading, error, sendRequest } = useCustomQuery();
    const initial_form_state = {
        name: '',
        description: ''
    }
    const handlesubmitNewWorkspace = () => {
        sendRequest(async () => await createWorkspace(form_state))

    }
    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handlesubmitNewWorkspace,
        initial_form_state
    })
    useEffect(() => {
        if (response && !loading && response.ok) {
            navigate(`/home`)
        }

    }, [response])

    return (
        <div className='newWorkspace-box'>
            <div className='btn-newWorkspace-back'>
            <Link to={'/home'}>
                <HiArrowLeft /> Volver
            </Link>
            </div>
            {
                loading
                    ? <span>cargando...</span>
                    : <>
                        <h1 className='tt-newWorkspaceScreen'>Crear espacio de trabajo</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='form-newWorkspaceScreen'>
                                <label htmlFor='name'>Nombre</label>
                                <input
                                className='input-newWorkspaceScreen'
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-newWorkspaceScreen'>
                                <label htmlFor='description'>Descripcion</label>
                                <input
                                className='input-newWorkspaceScreen'
                                    type="text"
                                    name='description'
                                    id='description'
                                    value={form_state.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className='btn-newWorkspaceScreen'>Crear espacio de trabajo</button>
                        </form></>
            }

        </div>
    );
}

export default NewWorkspaceScreen