import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SideBarChannel.css'

const SidebarChannel = ({ channels }) => {
    
    return (
       <aside className='sidebar'>
                    <nav className='sidebar-nav'>
                        {
                            channels.length > 0
                                ? channels.map((channel) => {
                                    return (
                                        <React.Fragment key={channel._id} >
                                            <Link className='sidebar-link'

                                                to={`/workspace/${channel.workspace_id}/channels/${channel._id}`}
                                            >
                                                {channel.name}
                                            </Link>
                                            <br />
                                        </React.Fragment>
                                    )
                                })
                                : <p>No hay canales </p>
                        }
                    </nav>
            </aside>)
}

export default SidebarChannel