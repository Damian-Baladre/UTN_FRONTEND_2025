import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useCustomQuery from '../../hooks/useCustomQuery';
import { getAllMessagesByChannelId, createNewMessage } from '../../services/messagesService';
import useForm from '../../hooks/useForm';
import './Chat.css'

const Chat = () => {
    const {channel_id, workspace_id} = useParams();

    const { 
        response: serverMessagesResponse, 
        loading, 
        error, 
        sendRequest 
    } = useCustomQuery();

    useEffect( () => {
        sendRequest( async () => getAllMessagesByChannelId({channel_id, workspace_id}))
    }, [channel_id]);

    const initial_form_state = {
        content: '',
    };

    const handleSubmitNewMessage = () => {
        sendRequest(
            async () => await createNewMessage ({
                channel_id, 
                workspace_id, 
                content: form_state.content
            })
        );
    };

    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewMessage,
        initial_form_state: initial_form_state
    });

    if(loading)
         return <span>cargando...</span>
    
    return (
        <div className='chat'>
            <h1 className='tt-chat'>Mensajes:</h1>
            <div className='chat-messages'>
            {
                serverMessagesResponse && serverMessagesResponse.data.messages.map( (message) => 
                    <div key={message._id}>
                        <b className='chat-username'>{message.user && message.user.name}:</b>
                        <p className='chat-message'>{message.content}</p>
                    </div>
                )
            }
            </div>
            <form className='chat-form' onSubmit={handleSubmit}>
                <div className='chat-input'>
                <label htmlFor='content'>Escribe tu mensaje</label>
                <textarea name='content' id='content' onChange={handleChange} value={form_state.content}></textarea>
                </div>
                <button type="submit" className='btn-chat'>Enviar mensaje</button>
            </form>
        </div>
    )
};

export default Chat