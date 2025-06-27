import React from 'react'
import { useParams } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import { getAllMessagesByChannelId } from '../../services/messagesService';

const Chat = () => {
    const {channel_id, workspace_id} = useParams()
    const { response: server_messages_response, loading, error, sendRequest } = useCustomQuery()
    useEffect( () => {
        sendRequest( async () => getAllMessagesByChannelId({channel_id, workspace_id}))
    }, [channel_id]) //Dependencias: channel_id, cada vez que cambie el channel_id se ejecuta el useEffect

    if(loading) return <span>cargando...</span>
    return (
        <div>
            <h1>Mensajes:</h1>
            {
                server_messages_response && server_messages_response.data.messages.map( (message) => 
                    <div key={message._id}>
                        <b>Autor: {message.user.name}</b>
                        <p>{message.content}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Chat