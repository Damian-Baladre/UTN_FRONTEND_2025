import React, { useEffect, useState } from 'react'
import { getChannels } from '../../services/channelService'
import { useNavigation, useParams } from 'react-router-dom';
import SidebarChannel from '../../components/SidebarChannels/SidebarChannel';
import useCustomQuery from '../../hooks/useCustomQuery';

const WorkspaceScreen = () => {
    const { response: channelsResponse, error, loading, sendRequest } = useCustomQuery();
    const { workspace_id, channel_id } = useParams()
    const navigation = useNavigation();

    useEffect(() => {
        sendRequest(async () => getChannels({ workspace_id }))
    }, []);

    if (!loading & channelsResponse) {
        if (!channel_id) {
            d
            return <Navigate
                to={
                    `/workspace/${workspace_id}/channels/${channelsResponse.data.channels[0]._id}`
                }
            />
        }
    }

    if (loading) {
        return <div>
            <h1>Cargando espacios de trabajo...</h1>
        </div>
    }

    return (
         <div>
            <h1>Detalle del espacio de trabajo</h1>
            
            {
                !loading && channels_response && <SidebarChannels channels={channels_response.data.channels}/>
            }
            {
                channel_id 
                && !loading 
                && channels_response 
                && channels_response.data.channels.length > 0 
                && <Chat/>
            }
        </div>
    )
}

export default WorkspaceScreen