import React, { useEffect, useState } from 'react'
import { getChannels } from '../../services/channelService'
import { Navigate, useParams } from 'react-router-dom';
import SidebarChannel from '../../components/SidebarChannels/SidebarChannel';
import useCustomQuery from '../../hooks/useCustomQuery';
import Chat from '../../components/Chat/Chat';

const WorkspaceScreen = () => {
        const { workspace_id, channel_id } = useParams()
    const { response: channelsResponse, error, loading, sendRequest } = useCustomQuery();

    console.log('elchannelresponse', channelsResponse)

    useEffect(() => {
        sendRequest(async () => getChannels({ workspace_id }))
    }, []);

    if (!loading & channelsResponse) {
        if (!channel_id) {
            return <Navigate
                to={
                    `/workspace/${workspace_id}/channel/${channelsResponse.data.channels[0]._id}`
                }
            />
        }
    }

    if (loading) {
        return (
        <div>
            <h1>Cargando espacios de trabajo...</h1>
        </div>
        )
    }

    return (
         <div>
            <h1>Detalle del espacio de trabajo</h1>
            
            {
                !loading && channelsResponse && <SidebarChannel channels={channelsResponse.data.channels}/>
            }
            {
                channel_id 
                && !loading 
                && channelsResponse 
                && channelsResponse.data.channels.length > 0 
                &&  <Chat />
            }
        </div>
    )
}

export default WorkspaceScreen