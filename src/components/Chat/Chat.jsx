import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useCustomQuery from '../../hooks/useCustomQuery'
import { getAllMessagesByChannelId, createNewMessage } from '../../services/messagesService';
import useForm from '../../hooks/useForm';

const Chat = () => {
    const {channel_id, workspace_id} = useParams()
    const { response: serverMessagesResponse, loading, error, sendRequest } = useCustomQuery()

    useEffect( () => {
        sendRequest( async () => getAllMessagesByChannelId({channel_id, workspace_id}))
    }, [channel_id])

    const initialFormState = {
        content: '',
    }
    const handleSubmitNewMessage = () => {
        sendRequest(
            async () => await createNewMessage ({channel_id, workspace_id, content: form_state.content})
        )
    }
    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewMessage,
        initialFormState: initialFormState
    })

    if(loading) return <span>cargando...</span>
    
    return (
        <div>
            <h1>Mensajes:</h1>
            {
                serverMessagesResponse && serverMessagesResponse.data.messages.map( (message) => 
                    <div key={message._id}>
                        <b>Autor: {message.user && message.user.name}</b>
                        <p>{message.content}</p>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='content'>Escribe tu meensaje</label>
                <textarea name='content' id='content' onChange={handleChange} value={form_state.content}></textarea>
                </div>
                <button type="submit">Enviar mensaje</button>
            </form>
        </div>
    )
}

export default Chat