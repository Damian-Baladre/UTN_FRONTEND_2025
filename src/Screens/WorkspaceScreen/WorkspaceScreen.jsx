import React, { useEffect, useState } from 'react';
import { createChannel } from '../../services/channelService';
import { getChannels } from '../../services/channelService';
import { Navigate, useParams } from 'react-router-dom';
import SidebarChannel from '../../components/SidebarChannels/SidebarChannel';
import useCustomQuery from '../../hooks/useCustomQuery';
import useForm from '../../hooks/useForm';
import Chat from '../../components/Chat/Chat';
import { HiBars3 } from 'react-icons/hi2'
import { HiX } from "react-icons/hi";
import './WorkspaceScreen.css';


const WorkspaceScreen = () => {
    const { workspace_id, channel_id } = useParams();
    const [creatingChannel, setCreatingChannel] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmitNewChannel = () => {
        sendRequest(async () => await createChannel({ name: form_state.name, workspace_id: workspace_id }))
        setCreatingChannel(false)
    };

    const initial_form_state = {
        name: '',
    };

    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewChannel,
        initial_form_state
    });

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        return () => {
            setIsOpen(false)
        };
    }, []);

    useEffect(() => {
        sendRequest(async () => getChannels({ workspace_id }))
    }, []);

    const handleChangeCreateMode = () => {
        setCreatingChannel(true)
    };

    const handleQuitCreateMode = () => {
        setCreatingChannel(false)
    };

    const {
        response: channelsResponse,
        error,
        loading,
        sendRequest
    } = useCustomQuery();

    if (!loading & channelsResponse) {
        if (!channel_id) {
            return <Navigate
                to={
                    `/workspace/${workspace_id}/channel/${channelsResponse.data.channels[0]._id}`
                }
            />
        }
    };


    if (loading) {
        return (
            <div>
                <h1>Cargando espacios de trabajo...</h1>
            </div>
        )
    };

    return (
        <div className='workspaceMain'>
            <div className='workspaceSidebar'>
                <label htmlFor="toglle-menu" className='toggle-menu' onClick={toggleMenu}>
                    {!isOpen ? <HiBars3 size={40} /> : <HiX size={40} />}
                </label>
                {isOpen && (
                    <>
                    <h1 className='tt-workspace'>Detalle del espacio de trabajo</h1>
                {
                    !loading
                    && channelsResponse
                    && <SidebarChannel channels={channelsResponse.data.channels}/>
                }
                {
                    !creatingChannel
                        ? <button onClick={handleChangeCreateMode}>Crear canal</button>
                        : <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="">Nombre del canal</label>
                                <input
                                    type="text"
                                    placeholder="Crea un nuevo canal"
                                    onChange={handleChange}
                                    name="name"
                                    value={form_state.name}
                                />
                            </div>
                            <button type='submit'>Crear</button>
                            <button type="button" onClick={handleQuitCreateMode}>Cancelar</button>
                        </form>
                }
                </>)
                
            }
            </div>
            <div className='workspaceChat'>
                {
                    channel_id
                    && !loading
                    && channelsResponse
                    && channelsResponse.data.channels.length > 0
                    && <Chat />
                }
            </div>
        </div>
    );
};

export default WorkspaceScreen