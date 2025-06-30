import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useCustomQuery from '../../hooks/useCustomQuery'
import { Link } from 'react-router-dom'

const NewWorkspaceScreen = () => {
    const { response, loading, error, sendRequest } = useCustomQuery()
    const initialFormState = {
        name: '',
        description: ''
    }
    const handlesubmitNewWorkspace = () => {
        sendRequest(async () => await createW(form_state))

    }
    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handlesubmitNewWorkspace,
        initialFormState
    })
    useEffect(() => {
        if (response && !loading && response.ok) {
            navigate(`/home`)
        }

    }, [response])

    return (
        <div>
            <Link to={'/home'}>
                Volver mis Warkspeis
            </Link>
            {
                loading
                    ? <span>cargando...</span>
                    : <>
                        <h1>Crear espacio de trabajo</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='name'>Nombre</label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='description'>Descripcion</label>
                                <input
                                    type="text"
                                    name='description'
                                    id='description'
                                    value={form_state.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <button>Crear Warkspeis</button>
                        </form></>
            }

        </div>
    )
}

export default NewWorkspaceScreen